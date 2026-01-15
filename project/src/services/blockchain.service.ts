import { getContract } from "../config/contract";
import BlockchainLog from "../models/blockchainLog.model";
import { Iblockchain } from "../types/interfaces/BlockchainLog.inter";

export default class BlockchainService {
  static async recordTransaction(userId: string, payload: Iblockchain): Promise<Iblockchain | null> {
    const { type, refId, data } = payload;
    const contract = await getContract();

    let tx;
    if (type === "ProductCreated") {
      const { name, category } = data;
      tx = await contract.logProduct(refId, name, category);
    } else if (type === "InventoryUpdated") {
      const { productId, location, quantity } = data;
      tx = await contract.logInventory(refId, productId, location, quantity);
    } else {
      throw new Error("Unsupported transaction type.");
    }

    const receipt = await tx.wait();

    const log = await BlockchainLog.create({
      hash: tx.hash,
      type,
      refId,
      _user: userId,
      data,
      timestamp: new Date(),
    });

    return log;
  }

  static async getAllTransactions(userId: string): Promise<Iblockchain[]> {
    return BlockchainLog.find({ _user: userId }).populate("_user");
  }

  static async getTransactionById(id: string): Promise<Iblockchain | null> {
    return BlockchainLog.findById(id).populate("_user");
  }

  static async verifyTransactionHash(hash: string): Promise<Iblockchain | null> {
    return BlockchainLog.findOne({ hash });
  }

  static async getTransactionsByType(type: string): Promise<Iblockchain[]> {
    return BlockchainLog.find({ type }).populate("_user");
  }
}
