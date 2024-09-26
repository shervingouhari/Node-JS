import controller from "../controller.js";

export default new (class extends controller {
    async dashboard(req, res) {
        this.response({ res });
    }
    async me(req, res) {
        this.response({ res, data: req.user.show() });
    }
})();
