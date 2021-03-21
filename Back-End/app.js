const http = require('http');
const mysql = require('mysql');
let url = require('url');
const endPointRoot = "/individual/API/v1/";

const GET = 'GET';
const PUT = 'PUT';
const OPTIONS = 'OPTIONS';
const POST = 'POST';
const DELETE ='DELETE';

const db = mysql.createConnection({
    host: "localhost",
    user: "justinxi_Assignment",
    password: "nodemysql123",
    database: "justinxi_Assignment"
    
});

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    });
    let q = url.parse(req.url, true);
    const path = q.pathname;
    console.log(path);
    
    if (req.method === GET && path === endPointRoot + 'quotes/1') {
        db.connect(function(err) {
            if (err) {
                res.end("Unable to connect to DB");
                throw  err;
            } else {
                db.query("SELECT * FROM quotes where quoteId = 1",  function (err, rows, fields)  {
                    if (err) {
                        res.end("Select from table failed");
                        throw err;
                    } else {
                        let data = '';
                        rows.forEach(function(row) {
                            data += '<p>' + row.quote + ', ' + row.author + '</p></br>';
                        });
                        res.end(data);
                    }
                });
                
            }
        });
    } else if (req.method === GET && path === endPointRoot + 'quotes') {
                db.connect(function(err) {
            if (err) {
                res.end("Unable to connect to DB");
                throw  err;
            } else {
                db.query("SELECT * FROM quotes",  function (err, rows, fields)  {
                    if (err) {
                        res.end("Select from table failed");
                        throw err;
                    } else {
                        let data = '';
                        rows.forEach(function(row) {
                            data += row.quote + ', ' + row.author + '</br>';
                        });
                        res.end(data);
                    }
                });
                
            }
        });
        
        
    } else if (req.method === GET && path === endPointRoot + 'quotes/start') {
        db.connect(function(err) {
            if (err) {
                res.end("Unable to connect to DB");
                throw  err;
            } else {
                db.query("SELECT * FROM quotes",  function (err, rows, fields)  {
                    if (err) {
                        res.end("Select from table failed");
                        throw err;
                    } else {
                        let data = '';
                        rows.forEach(function(row) {
                            data += '<input type="' + 'text" id="quote' + row.quoteId + '" value="' + row.quote + '">' +
                            '<input type="' + 'text" id="author' + row.quoteId + '" value="' + row.author + '"> <button' +
                            ' onclick="update(' + row.quoteId + ')">' + row.quoteId + ' Update </button> ' +
                            '<button onclick="delete(' + row.quoteId + ')">' + 'Delete </button>' + '</br>';
                        });
                        res.end(data);
                    }
                });
                
            }
        });
        
        
    } else if (req.method === POST && path === endPointRoot + 'quotes') {
        // Recieve Data
        body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        let obj;
        db.connect(function (err) {
            if (err) {
                obj = JSON.parse(body);
                let quote = obj.quote;
                let author = obj.author;
                res.end("Unable to Connect to DB: Quote = " + quote + " | Author = " + author + err);
                throw err;
            } else {
                obj = JSON.parse(body);
                let quote = obj.quote;
                let author = obj.author;
                
                var sql = "INSERT INTO quotes(quoteId, quote, author) VALUES (" + "null" + ", '" + quote + "', '" + author + "' )" ;
                db.query(sql, function (err, result) {
                    if (err) {
                        res.end("Connected to DB / Failed to Write: Quote = " + quote + " | Author = " + author);
                        throw err;
                    } else {
                        res.end("Connected to DB / Successfully Wrote: Quote = " + quote + " | Author = " + author);
                    }
                });
            }
        });
        
    } else if (req.method === PUT) {
        body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        let obj;
        db.connect(function (err) {
            if (err) {
                obj = JSON.parse(body);
                let quote = obj.quote;
                let author = obj.author;
                let id = obj.quoteId;
                res.end("Unable to Connect to DB: Quote = " + quote + " | Author = " + author + " " + id + " " );
                throw err;
            } else {
                obj = JSON.parse(body);
                let quote = obj.quote;
                let author = obj.author;
                let id = obj.quoteId;
                
                var sql = "UPDATE quotes SET quote = '" + quote + "', author='" + author + "' WHERE quoteId = " + quoteId;
                db.query(sql, function (err, result) {
                    if (err) {
                        res.end("Connected to DB / Failed to update: Quote = " + quote + " | Author = " + author);
                        throw err;
                    } else {
                        res.end("Connected to DB / Successfully update: Quote = " + quote + " | Author = " + author);
                    }
                });
            }
        });
        
        
    } else if (req.method === DELETE){
        body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        let obj;
        db.connect(function (err) {
            if (err) {
                obj = JSON.parse(body);
                let quoteId = obj.quoteId;
                res.end("Unable to Connect to DB: Quote = " + quoteId + " " );
                throw err;
            } else {
                obj = JSON.parse(body);
                let quoteId = obj.quoteId;
                
                var sql = "DELETE FROM quotes WHERE quoteId =" + quoteId;
                db.query(sql, function (err, result) {
                    if (err) {
                        res.end("Connected to DB / Failed to delete: QuoteId = " + quoteId);
                        throw err;
                    } else {
                        res.end("Connected to DB / Successfully deleted: QuoteId = " + quoteid);
                    }
                });
            }
        });
        
        
    } else {
            var message = "individual assignment DB\n",
                version = "NodeJS " + process.versions.node + '\n',
                response = [message, version].join('\n');
            res.end(response);
        
    }

    
    
});
server.listen();

