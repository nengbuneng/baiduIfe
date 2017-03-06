/**
 * Created by myth52125 on 17/3/6.
 */
var HTMLPreview = {
    content: "", previewform: document.getElementById("previewform"), file: function () {
        return location.search.substring(1)
    }, raw: function () {
        return HTMLPreview.file().replace(/\/\/github\.com/, "//raw.githubusercontent.com").replace(/\/blob\//, "/")
    }, replaceAssets: function () {
        var a, b, c;
        a = document.querySelectorAll("iframe[src],frame[src]");
        for (b = 0; b < a.length; ++b)if (c = a[b].src, 0 < c.indexOf("//raw.githubusercontent.com") || 0 < c.indexOf("//bitbucket.org")) a[b].src = "//" + location.hostname + location.pathname + "?" + c;
        a = document.querySelectorAll("a[href]");
        for (b = 0; b < a.length; ++b)c = a[b].href, 0 < c.indexOf("#") ? a[b].href = "//" + location.hostname + location.pathname + location.search + "#" + a[b].hash.substring(1) : (0 < c.indexOf("//raw.githubusercontent.com") || 0 < c.indexOf("//bitbucket.org")) && (0 < c.indexOf(".html") || 0 < c.indexOf(".htm")) && (a[b].href = "//" + location.hostname + location.pathname + "?" + c);
        if (!document.querySelectorAll("frameset").length) {
            a = document.querySelectorAll("link[rel=stylesheet]");
            for (b = 0; b < a.length; ++b)c = a[b].href, (0 < c.indexOf("//raw.githubusercontent.com") || 0 < c.indexOf("//bitbucket.org")) && HTMLPreview.send(c, "loadCSS");
            a = document.querySelectorAll('script[type="text/htmlpreview"]');
            for (b = 0; b < a.length; ++b)c = a[b].src, 0 < c.indexOf("//raw.githubusercontent.com") || 0 < c.indexOf("//bitbucket.org") ? HTMLPreview.send(c, "loadJS") : (a[b].removeAttribute("type"), document.write(a[b].outerHTML))
        }
    }, loadHTML: function (a) {
        a && a.query && a.query.diagnostics && a.query.diagnostics.redirect ? HTMLPreview.send(a.query.diagnostics.redirect.content, "loadHTML") : a && a.query && a.query.results && a.query.results.resources && a.query.results.resources.content && 200 == a.query.results.resources.status ? (HTMLPreview.content = a.query.results.resources.content.replace(/<head>/i, '<head><base href="' + HTMLPreview.raw() + '">').replace(/<script( type=["'](text|application)\/javascript["'])?/gi, '<script type="text/htmlpreview"').replace(/<\/body>/i, '<script src="//' + location.hostname + '/htmlpreview.min.js">\x3c/script><script>HTMLPreview.replaceAssets();\x3c/script></body>').replace(/<\/head>\s*<frameset/gi, '<script src="//' + location.hostname + '/htmlpreview.min.js">\x3c/script><script>document.addEventListener("DOMContentLoaded",HTMLPreview.replaceAssets,false);\x3c/script></head><frameset'), setTimeout(function () {
                    document.open();
                    document.write(HTMLPreview.content);
                    document.close()
                }, 50)) : HTMLPreview.previewform.innerHTML = a && a.error && a.error.description ? a.error.description : "Error: Cannot load file " + HTMLPreview.raw()
    }, loadCSS: function (a) {
        a && a.query && a.query.diagnostics && a.query.diagnostics.redirect ? HTMLPreview.send(a.query.diagnostics.redirect.content, "loadCSS") : a && a.query && a.query.results && a.query.results.resources && a.query.results.resources.content && 200 == a.query.results.resources.status && document.write("<style>" + a.query.results.resources.content.replace(/url\((?:'|")?([^\/][^:'"\)]+)(?:'|")?\)/gi, "url(" + a.query.results.resources.url.replace(/[^\/]+\.css.*$/gi, "") + "$1)") + "</style>")
    }, loadJS: function (a) {
        a && a.query && a.query.diagnostics && a.query.diagnostics.redirect ? HTMLPreview.send(a.query.diagnostics.redirect.content, "loadJS") : a && a.query && a.query.results && a.query.results.resources && a.query.results.resources.content && 200 == a.query.results.resources.status && document.write("<script>" + a.query.results.resources.content + "\x3c/script>")
    }, send: function (a, b) {
        document.write('<script src="//query.yahooapis.com/v1/public/yql?q=use%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fyql%2Fyql-tables%2Fmaster%2Fdata%2Fdata.headers.xml%22%20as%20headers%3B%20select%20*%20from%20headers%20where%20url%3D%22' + encodeURIComponent(a) + "%22&format=json&diagnostics=true&callback=HTMLPreview." + b + '">\x3c/script>')
    }, submitform: function () {
        location.href = "/?" + document.getElementById("file").value;
        return !1
    }, init: function () {
        HTMLPreview.previewform.onsubmit = HTMLPreview.submitform;
        HTMLPreview.file() && (HTMLPreview.previewform.innerHTML = "<p>Loading...</p>", HTMLPreview.send(HTMLPreview.raw(), "loadHTML"))
    }
};
