import { Request, Response } from "express";
import { getData } from "./getData";

export default [
  {
    method: "get",
    path: "/getdata",
    handler: [
      async ({ query }: Request, res: Response) => {
        console.warn(query);
        const data = await getData(query.q, query.uid, query.key);
        res.send(data);
      },
    ],
  },
];
