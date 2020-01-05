import e = require('express');
import * as Multer from 'multer';
import { router } from "../decorators/Web";
const spawn = require("child_process").spawn;

var storage = Multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, './tmp')
        },
        filename: function (req: any, file, cb) {
                cb(null, req.body.fileName)
        }
});

var upload = Multer({ storage: storage }).single('file');

export default class CenterRoutes {

        @router({
                method: 'post',
                path: '/images'
        })
        async imgUpload(req: any, res: e.Response) {
                upload(req, res, function (err) {
                        let fileName = req.body.fileName;
                        if (err) {
                                console.log(err);
                                return res.end(err.toString());
                        } else {
                                const pythonProcess = spawn('python3.7', ["/root/code/iih-predict/predict.py", [`/root/code/iih-server/tmp/${fileName}`]]);
                                pythonProcess.stdout.on('data', function (data: any) {
                                        let dataStr = data.toString();
                                        console.log(dataStr);
                                        if (dataStr.indexOf("result:1") != -1) {
                                                res.send({
                                                        success: true
                                                })
                                        } else {
                                                res.send({
                                                        success: false
                                                })
                                        }
                                });
                                pythonProcess.stderr.on('data', (data: any) => {
                                        console.log(data.toString());
                                });
                        }
                });
        }

}

