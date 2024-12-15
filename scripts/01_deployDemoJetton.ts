import { toNano } from '@ton/core';
import { DemoJetton } from '../wrappers/DemoJetton';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const demoJetton = provider.open(
        DemoJetton.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('DemoJetton')
        )
    );

    await demoJetton.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(demoJetton.address);

    console.log('ID', await demoJetton.getID());
}
