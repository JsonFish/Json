import  request  from "@/utils/request/index.ts";
import { FileData, BasicResponse } from "./type.ts";
export const uploadFileReq = (data: FormData) => {
  return request.post<FormData,BasicResponse<FileData>>( "/file/upload",
    data ,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
