/*
 * File: /js/commands/emailto.js
 */

elFinder.prototype.commands.emailto = function () {
    var self = this,
        fm = self.fm,
        dfrd,
        /**
         * Return files acceptable to edit
         *
         * @param  Array  files hashes
         * @return Array
         **/
        filter = function (files) {
            var cnt = files.length,
                mime,
                ext,
                skip;

            if (cnt > 1) {
                mime = files[0].mime;
                ext = files[0].name.replace(/^.*(\.[^.]+)$/, "$1");
            }
            return $.grep(files, function (file) {
                if (skip || file.mime === "directory") {
                    return false;
                }

                return true;
            });
        };

    this.exec = function (hashes) {
        var url = fm.url(hashes[0], 0);

        var filename = url.split("/").pop();
        var emailTo = "";
        emailTo = prompt("Please enter mail address");

        if (emailTo == null) return;

        var res = emailTo.match(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        // If email is not valid.
        if (res == null) {
            alert("Please enter a valid email address");
            return;
        }

        window.open(
            "mailto:" + emailTo + "?subject=" + filename + "&body=" + url
        );
    };

    this.getstate = function (select) {
        var sel = this.files(select),
            cnt = sel.length;
        return cnt && filter(sel).length == cnt ? 0 : -1;
    };
};