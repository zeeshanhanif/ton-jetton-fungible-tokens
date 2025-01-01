import {toNano, Address} from '@ton/core';
import {JettonMinter} from '../wrappers/JettonMinter';
import { JettonWallet } from '../wrappers/JettonWallet';
import {compile, NetworkProvider, tonDeepLink} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptUrl, promptUserFriendlyAddress} from "../wrappers/ui-utils";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();

    //const jettonMinterAddress = Address.parse('EQD8y-EGnxxH2OK8QyWltpjO5obpEwc29IAetKVtQsVrBL5m');
    const jettonMinterAddress = Address.parse('EQCHBTW-E2sZRn4BlNLBAhX4LzBhNBqc1DGXLW0L9HE2jH6c');
    const jettonMinter = provider.open(JettonMinter.createFromAddress(jettonMinterAddress));

    const userAddress = Address.parse('0QD-dqOn-nz1Rf-VpCDWWpvrttkgytFj-qVZb4E6g_z9aloF');

    const walletAddress = await jettonMinter.getWalletAddress(Address.parse("0QD-dqOn-nz1Rf-VpCDWWpvrttkgytFj-qVZb4E6g_z9aloF"));
    console.log("wallet address = ",walletAddress);

    const jettonWallet = provider.open(JettonWallet.createFromAddress(walletAddress));
    console.log("jettonWallet = ",jettonWallet);

    //const data = await jettonWallet.getJettonBalance();
    const data = await jettonWallet.getWalletData();
    
    console.log("jetton wallet data = ",data);

}