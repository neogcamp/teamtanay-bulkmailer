"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
require("dotenv").config();
var _a = require("./Utils"), xlxToJson = _a.xlxToJson, dirCleanup = _a.dirCleanup, sendMail = _a.sendMail;
var cron = require("node-cron");
var filename = "TeamTanayRegisterations";
var task = "";
var batch = 1;
var batchesCount = 1;
var path = __dirname + "\\json";
function setUpBatch() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, xlxToJson(filename + ".xlsx")];
                case 1:
                    data = _a.sent();
                    batchesCount = data.batches;
                    // schedule("0 */15 8-18 * * *"
                    // Setting up CRON job repeat after every 15 minutes between 8AM - 6PM
                    task = cron.schedule("59 * * * * *", function () {
                        console.log("-----------------------------SENDING MAILS TO BATCH " + batch + "--------------------------------");
                        if (batch <= data.batches) {
                            var records_1 = JSON.parse(fs.readFileSync("./json/" + filename + "_" + batch + ".json", {
                                encoding: "utf8",
                                flag: "r",
                            }));
                            batch += 1;
                            var _loop_1 = function (i) {
                                var delay = (Math.floor(Math.random() * 10) + 5) * 1000;
                                setTimeout(function () {
                                    console.log(i, " : ", records_1[i]["Email address"], delay);
                                    console.log(records_1[i]["Tell us about your web development background?"]);
                                    // sendMail(
                                    //   records[i]["Email address"],
                                    //   records[i]["Tell us about your web development background?"],
                                    //   delay
                                    // );
                                }, delay);
                            };
                            for (var i = 0; i < records_1.length; i++) {
                                _loop_1(i);
                            }
                        }
                        else {
                            batch += 2;
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// const intervalRef = setInterval(() => {
//   if (task !== "" && batch > batchesCount) {
//     console.log("> SIGCLEAR: CLEANING UP JSON FILES");
//     dirCleanup(filename, batchesCount, path);
//     console.log("> SIGSTOP: STOPPING CRON JOB");
//     task.stop();
//     clearInterval(intervalRef);
//   }
// }, 1000);
// setUpBatch();
sendMail("", "Beginner level (Have some idea around coding/web development)", 4000);
