import crypto from "crypto";
export function encrypt(v:string,key:string){
  const iv=crypto.randomBytes(16);
  const cipher=crypto.createCipheriv("aes-256-cbc",Buffer.from(key),iv);
  let enc=cipher.update(v);
  enc=Buffer.concat([enc,cipher.final()]);
  return iv.toString("hex")+":"+enc.toString("hex");
}
