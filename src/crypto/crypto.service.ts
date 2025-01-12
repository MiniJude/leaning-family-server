import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  /**
   * 对输入数据进行加密处理
   *
   * @author: lcs
   * @param data 待加密的数据字符串
   * @returns 返回加密后的字符串
   */
  encrypt(data: string): string {
    const hmac = crypto.createHmac('sha256', 'learning-family-secret');
    return hmac.update(data).digest('hex');
  }

  /**
   * 验证数据的签名是否匹配
   *
   * @author: lcs
   * @param data 需要验证的数据
   * @param sign 签名
   * @returns 如果签名匹配则返回 true，否则返回 false
   */
  verify(data: string, sign: string): boolean {
    data = this.encrypt(data);
    return data === sign;
  }
}
