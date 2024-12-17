import {toNano, Address} from '@ton/core';
import {JettonMinter} from '../wrappers/JettonMinter';
import {compile, NetworkProvider} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptUrl, promptUserFriendlyAddress} from "../wrappers/ui-utils";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();
    const jettonWalletCodeRaw = await compile('JettonWallet');

    //const adminAddress = await promptUserFriendlyAddress("Enter the address of the jetton owner (admin):", ui, isTestnet);
    const adminAddress = Address.parse("0QD-dqOn-nz1Rf-VpCDWWpvrttkgytFj-qVZb4E6g_z9aloF");

    //const jettonMetadataUri = await promptUrl("Enter jetton metadata uri (https://jettonowner.com/jetton.json)", ui)
    const jettonMetadataUri = "https://coral-wasteful-lion-960.mypinata.cloud/ipfs/QmS3jqdgxAUMAoMeRsf9Trx7p9Dhk6yMiRYvw5EyLajtse/ton-jetton-metadata.json";

    const jettonWalletCode = jettonWalletCodeFromLibrary(jettonWalletCodeRaw);

    const minter = provider.open(JettonMinter.createFromConfig({
            admin: adminAddress,
            wallet_code: jettonWalletCode,
            jetton_content: {type: 1, uri: jettonMetadataUri}
        },
        await compile('JettonMinter'))
    );

    const result = await minter.sendDeploy(provider.sender(), toNano("1.5")); // send 1.5 TON

    console.log("deploy result = ",result);

    
    const waitResult = await provider.waitForDeploy(minter.address);
    console.log("wait result = ",waitResult);

    console.log("Minter Address = ",minter.address);
}