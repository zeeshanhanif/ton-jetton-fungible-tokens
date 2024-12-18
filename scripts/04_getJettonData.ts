import {toNano, Address} from '@ton/core';
import {JettonMinter} from '../wrappers/JettonMinter';
import {compile, NetworkProvider} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptUrl, promptUserFriendlyAddress} from "../wrappers/ui-utils";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';


    //const jettonMinterAddress = Address.parse('EQD8y-EGnxxH2OK8QyWltpjO5obpEwc29IAetKVtQsVrBL5m');
    const jettonMinterAddress = Address.parse('EQCHBTW-E2sZRn4BlNLBAhX4LzBhNBqc1DGXLW0L9HE2jH6c');
    
    const jettonMinter = provider.open(JettonMinter.createFromAddress(jettonMinterAddress));

    
    const data = await jettonMinter.getJettonData();

    console.log("jetton data = ",data);

    const walletAddress = await jettonMinter.getWalletAddress(Address.parse("0QD-dqOn-nz1Rf-VpCDWWpvrttkgytFj-qVZb4E6g_z9aloF"));
    //const walletAddress = await jettonMinter.getWalletAddress(Address.parse("0QATq6G2O_htNkHmEX3Xm_HuVfHP5pJ1WvpdIJark9OGpp1L"));
    console.log("walletAddress = ",walletAddress);

}