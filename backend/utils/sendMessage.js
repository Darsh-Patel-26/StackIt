export const sendMessage =  (res,statusCode=400,message="Error Occured") => {
    return res.
    status(statusCode)
    .json({
        status:statusCode >= 200 && statusCode < 300,
        message        
    });
}