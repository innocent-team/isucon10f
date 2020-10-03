"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
const fs_1 = __importDefault(require("fs"));
const web_push_1 = __importDefault(require("web-push"));
const sshpk_1 = __importDefault(require("sshpk"));
const urlsafe_base64_1 = __importDefault(require("urlsafe-base64"));
const util_1 = __importDefault(require("util"));
const notification_pb_1 = require("../proto/xsuportal/resources/notification_pb");
const app_1 = require("./app");
const sleep = util_1.default.promisify(setTimeout);
class Notifier {
    constructor() {
        this.getVAPIDKey();
    }
    getVAPIDKey() {
        if (Notifier.VAPIDKey)
            return Notifier.VAPIDKey;
        if (!fs_1.default.existsSync(Notifier.WEBPUSH_VAPID_PRIVATE_KEY_PATH))
            return null;
        const pri = sshpk_1.default.parsePrivateKey(fs_1.default.readFileSync(Notifier.WEBPUSH_VAPID_PRIVATE_KEY_PATH), "pem");
        const pub = pri.toPublic();
        const privateKey = urlsafe_base64_1.default.encode(pri.part.d.data);
        const publicKey = urlsafe_base64_1.default.encode(pub.part.Q.data);
        web_push_1.default.setVapidDetails(`mailto:${Notifier.WEBPUSH_SUBJECT}`, publicKey, privateKey);
        Notifier.VAPIDKey = { privateKey, publicKey };
        return Notifier.VAPIDKey;
    }
    async notifyClarificationAnswered(clar, db, updated = false) {
        const contestants = await db.query(clar.disclosed
            ? 'SELECT `id`, `team_id` FROM `contestants` WHERE `team_id` IS NOT NULL'
            : 'SELECT `id`, `team_id` FROM `contestants` WHERE `team_id` = ?', [clar.team_id]);
        for (const contestant of contestants) {
            const clarificationMessage = new notification_pb_1.Notification.ClarificationMessage();
            clarificationMessage.setClarificationId(clar.id);
            clarificationMessage.setOwned(clar.team_id === contestant.team_id);
            clarificationMessage.setUpdated(updated);
            const notification = new notification_pb_1.Notification();
            notification.setContentClarification(clarificationMessage);
            const inserted = await this.notify(notification, contestant.id, db);
            if (inserted && Notifier.VAPIDKey) {
                notification.setId(inserted.id);
                notification.setCreatedAt(app_1.convertDateToTimestamp(inserted.created_at));
                // TODO Web Push IIKANJINI SHITE
            }
        }
    }
    async notifyBenchmarkJobFinished(job, db) {
        const contestants = await db.query('SELECT `id`, `team_id` FROM `contestants` WHERE `team_id` = ?', [job.team_id]);
        for (const contestant of contestants) {
            const benchmarkJobMessage = new notification_pb_1.Notification.BenchmarkJobMessage();
            benchmarkJobMessage.setBenchmarkJobId(job.id);
            const notification = new notification_pb_1.Notification();
            notification.setContentBenchmarkJob(benchmarkJobMessage);
            const inserted = await this.notify(notification, contestant.id, db);
            if (inserted && Notifier.VAPIDKey) {
                notification.setId(inserted.id);
                notification.setCreatedAt(app_1.convertDateToTimestamp(inserted.created_at));
                // TODO Web Push IIKANJINI SHITE
            }
        }
    }
    async notify(notification, contestantId, db) {
        const encodedMessage = Buffer.from(notification.serializeBinary()).toString('base64');
        await db.query('INSERT INTO `notifications` (`contestant_id`, `encoded_message`, `read`, `created_at`, `updated_at`) VALUES (?, ?, FALSE, NOW(6), NOW(6))', [contestantId, encodedMessage]);
        let [n] = await db.query('SELECT * FROM `notifications` WHERE `id` = LAST_INSERT_ID() LIMIT 1');
        return n;
    }
}
exports.Notifier = Notifier;
Notifier.WEBPUSH_VAPID_PRIVATE_KEY_PATH = '../vapid_private.pem';
Notifier.WEBPUSH_SUBJECT = 'xsuportal@example.com';
