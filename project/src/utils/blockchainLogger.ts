// // utils/blockchainLogger.ts
// import { ethers } from "ethers";

// export const recordBlockchainEvent = (action: string, metadata: any) => {
// 	const data = {
// 		action,
// 		timestamp: new Date().toISOString(),
// 		...metadata,
// 	};

// 	const raw = JSON.stringify(data);
// 	const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(raw));

// 	return {
// 		data,
// 		hash,
// 	};
// };
