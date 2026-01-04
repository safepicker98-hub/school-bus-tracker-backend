
const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_bl5g9IG5oA4urX7inYP",
    host: "pg-7d34f48-gowthamdeveloper94-2e8a.l.aivencloud.com",
    port: 14219,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUNG4fI5FU5xomR/MwwetbZTNvTf4wDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YTI2MTZlODktYjc4OC00MzA1LWI1NzQtYTFhMGZjNWRi
ZDZjIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMjMxMDQyNjI4WhcNMzUxMjI5MDQy
NjI4WjBAMT4wPAYDVQQDDDVhMjYxNmU4OS1iNzg4LTQzMDUtYjU3NC1hMWEwZmM1
ZGJkNmMgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAI8OEgR47IPPC0/ZHPGRlLa3afWjZJ6chMU0P0e5+AKiHGd+4CZhqITX
hYTPizWLysH1sgrK30SdLxkh3nNzpmFCMJuVUSLVGfkONW5SU3frEE0FXXI3888N
5GpzfnueXKUF7GRcaj7e4vliZtytay52h6L2fq9pe7UQGQCoJll/TZBjMQT7Le53
jpbC0AzWu0VdCcS6nncjelyhSu5aFDEGb1oBLIXtiPg/nTEGXf6TYvye3B8OYS1D
tJW1NzaRMJK/VmZCM7kDAWGqCi3pXuoo5317QAjYf5/dZKAWtmanOGFt5ewLxEMi
bBWfeyOwA5SuAT79Gn+bZgYOP5ADWc/M2iWUjy2aZsCaAoKxhKpi6EcHHy9Yxu7H
QXEAqCsj8jHPOUEXkyQcKy5WKyH335LYGZM0bJKcWMGg1m2gsXmoyLOOFpJ8dorU
ydfLt9rdb5407hK8HR4yfzsWi6DXAyHffHDLN4o43UI8Et1urHG9qraMoe9QVsn9
gnsYlK6w8QIDAQABo0IwQDAdBgNVHQ4EFgQUVYte7u/JCsXXtET6jOL+YUPPwykw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAE85bffK1su4Ts7a2p3UjhiaStwULL65klSgD6qYzEwUC2Sph3vqai3CQIqp
aLZl/9XZp8BBeOECiEfwbnJWzkPt61wlr0ZEAQp89PGWCDnLmzY4byJrcHnz3Aqf
2R59NLguT6tu2WR6DZRfJ6+GdcOREmam/7Z7As3UZUmoeN4er2O5Ncuv5KaUVWot
w1uYZXT/WBxu23rxlS1a8kX7eaBicj01E2mHzonaGDIFF9cNpU8l8lnhrHqINe1L
G+Vdl1tyXMIurbWFz+1mlOlcrKeqoJLSnKy/eqg8ZJpZnfvLjZjFLD7pip8Zr/Mf
+XoHNHjbPAEIuIkoJ8ggGuHSMe4gUaaaOGPRZz7j8WcLKV9fcFe+rmv2cAsHVDL9
fBxIsW2M9CRYKXF8Z3ibhyPjUURANWKrYn95+h6ui1ReV9hR2qbWfO5SSngnlXvY
x1MJOTYkRrmv7mvfQf+jVAKT7hLNsuFrPhXQ3HAana/DLrWjcffklss8znpmRjgW
Fwu2Kw==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});

module.exports = client;