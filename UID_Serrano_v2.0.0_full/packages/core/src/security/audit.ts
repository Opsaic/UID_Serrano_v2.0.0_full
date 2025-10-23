export function audit(event:string,user?:string,meta?:any){
  console.log("AUDIT",new Date().toISOString(),{event,user,meta});
}
