import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "ton-crypto";
import { TonClient, WalletContractV4, fromNano, internal } from "ton";

async function main() {
    //привязка кошелька v4 
    const mnemonic = "divide roast horn cash state cherry maze oval palace mountain general spin matter lake hammer seat sea pulse side actress tide muscle winter ocean";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    //инициализируем клиент ton RPC в тестовой сети
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // проверка, что кошелек развернут
    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed");
    }
		console.log("wallet is deployed - ", wallet.address);
		
		const balance = await client.getBalance(wallet.address)
		console.log("balance: ", fromNano(balance));
		
}

main()