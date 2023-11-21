import { NextFunction,Request,Response } from 'express'
import ErrorHandler from '../utils/ErrorHandler'

export const ErrorMiddleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Interal server error'

    //wrong mongodb id error
    if(err.name === 'Cast error'){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    //duplicate key error
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.KeyValue)} entered`
        err = new ErrorHandler(message,400)
    }

    if(err.name == 'JsonWebtokenError'){
        const message = `Json web token is invalid, try again`
        err = new ErrorHandler(message,400)
    }

    //JWT expired error
    if(err.name === 'TokenExpiiredError'){
        const message = `Json web token  is expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}