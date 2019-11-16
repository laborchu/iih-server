import e = require('express');
import * as Multer from 'multer';
import { router } from "../decorators/Web";

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
                        if (err) {
                                console.log(err);
                                return res.end(err.toString());
                        } else {
                                res.send({
                                        success: true
                                })
                        }
                });
        }

}

