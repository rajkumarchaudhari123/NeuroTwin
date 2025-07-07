import mongoose from "mongoose";

declare global {
  let mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {};
