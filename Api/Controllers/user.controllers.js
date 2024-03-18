import express from "express";

export const test = (req, res, next) => {
  res.json({ message: `API test Created ...` });
};
