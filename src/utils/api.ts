import axios from "axios";
export class ResponseInterface {
  constructor(code: number, data: any) {
    this.code = code;
    this.data = data;
  }
  code: number;
  data: any;
}

async function WAIT(time: any) {
  await new Promise((r) => setTimeout(r, time))
}
// # SUCCESS
export async function login(email: string, password: string):Promise<ResponseInterface | void>{
  try {
    var result = await axios.post('auth/adminlogin', {email: email, password: password});
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetDashStat():Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getdashstat');
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetAllAccountInfo():Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getallaccountinfo');
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetRequests():Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getrequests');
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetAllInfoBrief(limit: number):Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getinfobrief/'+limit);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetAllInfo(collection: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getallinfo/'+collection);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetAccountInfo(id: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getaccountinfo/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function GetAdmins():Promise<ResponseInterface>{
  try {
    var result = await axios.get('admin/getadmins');
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

// ######################################
export interface CreateEditAccountI {accountName: string, ownerEmail:string, ownerFirstName: string, ownerLastName:string, ownerPhone:string, packageId: string, expiryDate:string }
export interface AddAdminI {adminFirstName: string, adminLastName: string, adminEmail: string, password: string, roleId: string}
export interface DecideRequestI { requestId: string, descision: string }

// # SUCCESS
export async function CreateAccount(body: CreateEditAccountI):Promise<ResponseInterface>{
  try {
    var result = await axios.post('admin/createaccount', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function EditAccount(id: string, body: CreateEditAccountI):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('admin/editaccount/'+id, body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function AddAdmin(body: AddAdminI):Promise<ResponseInterface>{
  try {
    var result = await axios.post('admin/addadmin', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function DecideRequest(body: DecideRequestI):Promise<ResponseInterface>{
  try {
    var result = await axios.post('admin/deciderequest', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function DeleteAccount(id: string):Promise<ResponseInterface>{
  try {
    var result = await axios.delete('admin/deleteaccount/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}
// # SUCCESS
export async function DeleteAdmin(id: string):Promise<ResponseInterface>{
  try {
    var result = await axios.delete('admin/deleteadmin/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}