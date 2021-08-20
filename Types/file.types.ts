import { Module } from "module";

export type file = {
  Timestamp: String;
  Name: String;
  "Discord id (tag)": String;
  "Tell us about your web development background?": String;
  "Email address": String;
};

export type msg =
  | {
      to: String;
      from: String;
      subject: String;
      html: String;
    }
  | String;

export type BEGINNER =
  "Beginner level (Have some idea around coding/web development)";
export type ABSOLUTE_BEGINNER =
  "Absolute Beginner level (Know nothing about web development, but wish to learn)";
export type ADVANCED =
  "Advanced level (Know a lot in web development, but love it and wish to learn more in a structured manner)";
export type INTERMEDIATE =
  "Intermediate level (Have been doing web development for 1 year or more)";
