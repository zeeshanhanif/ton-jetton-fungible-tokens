import {toNano, Address} from '@ton/core';
import {JettonMinter} from '../wrappers/JettonMinter';
import {compile, NetworkProvider, tonDeepLink} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptUrl, promptUserFriendlyAddress} from "../wrappers/ui-utils";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';


    //const jettonMinterAddress = Address.parse('EQD8y-EGnxxH2OK8QyWltpjO5obpEwc29IAetKVtQsVrBL5m');
    const jettonMinterAddress = Address.parse('EQCHBTW-E2sZRn4BlNLBAhX4LzBhNBqc1DGXLW0L9HE2jH6c');
    const jettonMinter = provider.open(JettonMinter.createFromAddress(jettonMinterAddress));

    // My address
    const userAddress = Address.parse('0QD-dqOn-nz1Rf-VpCDWWpvrttkgytFj-qVZb4E6g_z9aloF');

    //const userAddress = Address.parse('0QATq6G2O_htNkHmEX3Xm_HuVfHP5pJ1WvpdIJark9OGpp1L');
    
    const mintResult = await jettonMinter.sendMint(provider.sender()  ,userAddress,toNano("100"),toNano("0.05"),toNano("0.1"));

    console.log("jetton data = ",mintResult);

}