"use strict";

var VariablePacket = require("../variable-packet"),
    util = require("util");

/** A packet that communicates the list of available game servers to the client.
 * This packet is only sent by the master server to the client.
 * 
 * @event PacketServer#packet-game-server-list
 * @type {object}
 * @property {array} servers The list of servers as GameInfo objects
 */
function GameServerListPacket() {
    VariablePacket.call(this);
    this.packetId = 0xA8;
    this.packetName = "game-server-list";
    this.servers = [];
}
util.inherits(GameServerListPacket, VariablePacket);
GameServerListPacket.id = 0xA8;

GameServerListPacket.prototype.variableEncode = function(buf) {
    buf.writeUInt8(0x5D);
    buf.writeUInt16(this.servers.length);
    for(var i = 0; i < this.servers.length; ++i) {
        var server = this.servers[i];
        buf.writeUInt16(i);
        buf.writeAsciiString(server.name, 32);
        buf.writeUInt8((server.playerCount / server.playerLimit) | 0);
        buf.writeUInt8(server.gmtOffset);
        buf.writeUInt8(server.ipv4[3]);
        buf.writeUInt8(server.ipv4[2]);
        buf.writeUInt8(server.ipv4[1]);
        buf.writeUInt8(server.ipv4[0]);
    }
};

module.exports = GameServerListPacket;
