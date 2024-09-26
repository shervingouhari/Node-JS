export default async function isAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(403).json({ message: "access denied", data: null });
    } else {
        next();
    }
}
