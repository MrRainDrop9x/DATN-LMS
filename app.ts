import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request,Response,NextFunction } from "express"
export const app = express();
import { ErrorMiddleware } from "./server/middleware/error";

//Username: caghi796
//Password: 4dI61xCUTlz1tqwf

//body parse
app.use(express.json({limit:'50mb'}));

// cookie  parse
app.use(cookieParser())

//cors => cross origin resource sharing

app.use(cors({
    origin: process.env.ORIGIN
}));


app.get("/test",(req:Request,res:Response,next:NextFunction) => {
    res.status(200).json({
        success:true,
        mess:'API is working'
    });
});

app.all('*',(req:Request,res:Response,next:NextFunction) => {
    const err= new Error(`route ${req.originalUrl} not found` ) as any;
    err.StatusCode = 404;
    next(err)
})

app.use(ErrorMiddleware)