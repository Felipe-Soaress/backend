var crypto = require("crypto");
const storage = require('node-sessionstorage')

const chavePr = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCvslv8UjnU9T3RG6WwJOTJ0EdSAFxMIT6N/eJ704Mh0CkksAD2
hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlUGbNxoF5JXgZn13ziUq9eL1AC
ayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X9rWUTwhBguBzL12BMQIDAQAB
AoGAVHE6uJikZu+/WCMbjP8OXtiVjpnRwl0v/XqKQc00dynevF1C+Tj4TlJIZKkQ
66w8SvDlypXOqEb7jJQSAFxstgYPbwxtKYzcyX9yEbK3c/PvJbnBAQxZSvJU7AuG
gt7rtvM/vPslGRYnYgn0Jia+/A8dbcgdd75/lcOdu3f9l2ECQQDirxCQR+m7gIHn
0GezLFnIY5heegSkw0MAh2cWuqby0v0KZrZG85CFP8nuknVL1o7x9HADfVYzXv4Q
cQOQO5ilAkEAxms8/LcNP/TkDWsg/KB0KVNypdoMbQhjZCdOz3LQuOEJnsLmqDvn
okMd0lkTA5+/HW67ATBYBM/mQ3qLrhQUnQJBAIYGM6jam9r8U9IXafiJlFviZsgV
JIG14PuDEvRhTyvqiymHKOYyQ5RE7sNbXHaGWOW9PC0UAc9FrrlR2GWClvECQEod
hIphVfGt6AGbIpc62CkXopuQ91NC7t1aUXXrzUtBw/Yplz8AIWXa7CjGXPPdl+XG
ltO62yXxAnHyNHqxxYECQQDHoSy3g7RmEkyBih3PTFChoo8djRn6b2HRPQuOAucK
xfgxCerR3aTqfzw+BOmd2yvUm4OIJ1y50G1pLZQnXKWv
-----END RSA PRIVATE KEY-----`;
const publicKey =
        `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvslv8UjnU9T3RG6WwJOTJ0EdS
        AFxMIT6N/eJ704Mh0CkksAD2hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlU
        GbNxoF5JXgZn13ziUq9eL1ACayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X
        9rWUTwhBguBzL12BMQIDAQAB
        -----END PUBLIC KEY-----`;

class HandShakeController {
    async doHandShake(req, res) {
      return res.json({publicKey :
        `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvslv8UjnU9T3RG6WwJOTJ0EdS
        AFxMIT6N/eJ704Mh0CkksAD2hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlU
        GbNxoF5JXgZn13ziUq9eL1ACayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X
        9rWUTwhBguBzL12BMQIDAQAB
        -----END PUBLIC KEY-----`});
    }


    async saveKey(req, res){
        var buffer = Buffer.from(req.body.data, "base64");
        var decrypted = crypto.privateDecrypt(chavePr, buffer);
        storage.setItem('keyPrivate', decrypted.toString("utf8"));
        return res.json({ok: true});
    
  }
}

module.exports = new HandShakeController();