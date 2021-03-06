// source: xsuportal/resources/team.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var xsuportal_resources_contestant_pb = require('../../xsuportal/resources/contestant_pb.js');
goog.object.extend(proto, xsuportal_resources_contestant_pb);
goog.exportSymbol('proto.xsuportal.proto.resources.Team', null, global);
goog.exportSymbol('proto.xsuportal.proto.resources.Team.StudentStatus', null, global);
goog.exportSymbol('proto.xsuportal.proto.resources.Team.TeamDetail', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.xsuportal.proto.resources.Team = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.xsuportal.proto.resources.Team.repeatedFields_, null);
};
goog.inherits(proto.xsuportal.proto.resources.Team, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.xsuportal.proto.resources.Team.displayName = 'proto.xsuportal.proto.resources.Team';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.xsuportal.proto.resources.Team.StudentStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.xsuportal.proto.resources.Team.StudentStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.xsuportal.proto.resources.Team.StudentStatus.displayName = 'proto.xsuportal.proto.resources.Team.StudentStatus';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.xsuportal.proto.resources.Team.TeamDetail = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.xsuportal.proto.resources.Team.TeamDetail, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.xsuportal.proto.resources.Team.TeamDetail.displayName = 'proto.xsuportal.proto.resources.Team.TeamDetail';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.xsuportal.proto.resources.Team.repeatedFields_ = [4,17];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.xsuportal.proto.resources.Team.prototype.toObject = function(opt_includeInstance) {
  return proto.xsuportal.proto.resources.Team.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.xsuportal.proto.resources.Team} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    leaderId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    memberIdsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    withdrawn: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    student: (f = msg.getStudent()) && proto.xsuportal.proto.resources.Team.StudentStatus.toObject(includeInstance, f),
    detail: (f = msg.getDetail()) && proto.xsuportal.proto.resources.Team.TeamDetail.toObject(includeInstance, f),
    leader: (f = msg.getLeader()) && xsuportal_resources_contestant_pb.Contestant.toObject(includeInstance, f),
    membersList: jspb.Message.toObjectList(msg.getMembersList(),
    xsuportal_resources_contestant_pb.Contestant.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.xsuportal.proto.resources.Team}
 */
proto.xsuportal.proto.resources.Team.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.xsuportal.proto.resources.Team;
  return proto.xsuportal.proto.resources.Team.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.xsuportal.proto.resources.Team} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.xsuportal.proto.resources.Team}
 */
proto.xsuportal.proto.resources.Team.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLeaderId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addMemberIds(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWithdrawn(value);
      break;
    case 10:
      var value = new proto.xsuportal.proto.resources.Team.StudentStatus;
      reader.readMessage(value,proto.xsuportal.proto.resources.Team.StudentStatus.deserializeBinaryFromReader);
      msg.setStudent(value);
      break;
    case 8:
      var value = new proto.xsuportal.proto.resources.Team.TeamDetail;
      reader.readMessage(value,proto.xsuportal.proto.resources.Team.TeamDetail.deserializeBinaryFromReader);
      msg.setDetail(value);
      break;
    case 16:
      var value = new xsuportal_resources_contestant_pb.Contestant;
      reader.readMessage(value,xsuportal_resources_contestant_pb.Contestant.deserializeBinaryFromReader);
      msg.setLeader(value);
      break;
    case 17:
      var value = new xsuportal_resources_contestant_pb.Contestant;
      reader.readMessage(value,xsuportal_resources_contestant_pb.Contestant.deserializeBinaryFromReader);
      msg.addMembers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.xsuportal.proto.resources.Team.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.xsuportal.proto.resources.Team.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.xsuportal.proto.resources.Team} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLeaderId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getMemberIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getWithdrawn();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getStudent();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.xsuportal.proto.resources.Team.StudentStatus.serializeBinaryToWriter
    );
  }
  f = message.getDetail();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.xsuportal.proto.resources.Team.TeamDetail.serializeBinaryToWriter
    );
  }
  f = message.getLeader();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      xsuportal_resources_contestant_pb.Contestant.serializeBinaryToWriter
    );
  }
  f = message.getMembersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      17,
      f,
      xsuportal_resources_contestant_pb.Contestant.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.xsuportal.proto.resources.Team.StudentStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.xsuportal.proto.resources.Team.StudentStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.xsuportal.proto.resources.Team.StudentStatus} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.StudentStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.xsuportal.proto.resources.Team.StudentStatus}
 */
proto.xsuportal.proto.resources.Team.StudentStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.xsuportal.proto.resources.Team.StudentStatus;
  return proto.xsuportal.proto.resources.Team.StudentStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.xsuportal.proto.resources.Team.StudentStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.xsuportal.proto.resources.Team.StudentStatus}
 */
proto.xsuportal.proto.resources.Team.StudentStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.xsuportal.proto.resources.Team.StudentStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.xsuportal.proto.resources.Team.StudentStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.xsuportal.proto.resources.Team.StudentStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.StudentStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool status = 1;
 * @return {boolean}
 */
proto.xsuportal.proto.resources.Team.StudentStatus.prototype.getStatus = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.xsuportal.proto.resources.Team.StudentStatus} returns this
 */
proto.xsuportal.proto.resources.Team.StudentStatus.prototype.setStatus = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.toObject = function(opt_includeInstance) {
  return proto.xsuportal.proto.resources.Team.TeamDetail.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.xsuportal.proto.resources.Team.TeamDetail} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.TeamDetail.toObject = function(includeInstance, msg) {
  var f, obj = {
    emailAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
    inviteToken: jspb.Message.getFieldWithDefault(msg, 16, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.xsuportal.proto.resources.Team.TeamDetail}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.xsuportal.proto.resources.Team.TeamDetail;
  return proto.xsuportal.proto.resources.Team.TeamDetail.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.xsuportal.proto.resources.Team.TeamDetail} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.xsuportal.proto.resources.Team.TeamDetail}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmailAddress(value);
      break;
    case 16:
      var value = /** @type {string} */ (reader.readString());
      msg.setInviteToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.xsuportal.proto.resources.Team.TeamDetail.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.xsuportal.proto.resources.Team.TeamDetail} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.xsuportal.proto.resources.Team.TeamDetail.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmailAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInviteToken();
  if (f.length > 0) {
    writer.writeString(
      16,
      f
    );
  }
};


/**
 * optional string email_address = 1;
 * @return {string}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.getEmailAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.xsuportal.proto.resources.Team.TeamDetail} returns this
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.setEmailAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string invite_token = 16;
 * @return {string}
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.getInviteToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 16, ""));
};


/**
 * @param {string} value
 * @return {!proto.xsuportal.proto.resources.Team.TeamDetail} returns this
 */
proto.xsuportal.proto.resources.Team.TeamDetail.prototype.setInviteToken = function(value) {
  return jspb.Message.setProto3StringField(this, 16, value);
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.xsuportal.proto.resources.Team.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.xsuportal.proto.resources.Team.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string leader_id = 3;
 * @return {string}
 */
proto.xsuportal.proto.resources.Team.prototype.getLeaderId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.setLeaderId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated string member_ids = 4;
 * @return {!Array<string>}
 */
proto.xsuportal.proto.resources.Team.prototype.getMemberIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.setMemberIdsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.addMemberIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.clearMemberIdsList = function() {
  return this.setMemberIdsList([]);
};


/**
 * optional bool withdrawn = 7;
 * @return {boolean}
 */
proto.xsuportal.proto.resources.Team.prototype.getWithdrawn = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.setWithdrawn = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional StudentStatus student = 10;
 * @return {?proto.xsuportal.proto.resources.Team.StudentStatus}
 */
proto.xsuportal.proto.resources.Team.prototype.getStudent = function() {
  return /** @type{?proto.xsuportal.proto.resources.Team.StudentStatus} */ (
    jspb.Message.getWrapperField(this, proto.xsuportal.proto.resources.Team.StudentStatus, 10));
};


/**
 * @param {?proto.xsuportal.proto.resources.Team.StudentStatus|undefined} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
*/
proto.xsuportal.proto.resources.Team.prototype.setStudent = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.clearStudent = function() {
  return this.setStudent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.xsuportal.proto.resources.Team.prototype.hasStudent = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional TeamDetail detail = 8;
 * @return {?proto.xsuportal.proto.resources.Team.TeamDetail}
 */
proto.xsuportal.proto.resources.Team.prototype.getDetail = function() {
  return /** @type{?proto.xsuportal.proto.resources.Team.TeamDetail} */ (
    jspb.Message.getWrapperField(this, proto.xsuportal.proto.resources.Team.TeamDetail, 8));
};


/**
 * @param {?proto.xsuportal.proto.resources.Team.TeamDetail|undefined} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
*/
proto.xsuportal.proto.resources.Team.prototype.setDetail = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.clearDetail = function() {
  return this.setDetail(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.xsuportal.proto.resources.Team.prototype.hasDetail = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional Contestant leader = 16;
 * @return {?proto.xsuportal.proto.resources.Contestant}
 */
proto.xsuportal.proto.resources.Team.prototype.getLeader = function() {
  return /** @type{?proto.xsuportal.proto.resources.Contestant} */ (
    jspb.Message.getWrapperField(this, xsuportal_resources_contestant_pb.Contestant, 16));
};


/**
 * @param {?proto.xsuportal.proto.resources.Contestant|undefined} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
*/
proto.xsuportal.proto.resources.Team.prototype.setLeader = function(value) {
  return jspb.Message.setWrapperField(this, 16, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.clearLeader = function() {
  return this.setLeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.xsuportal.proto.resources.Team.prototype.hasLeader = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * repeated Contestant members = 17;
 * @return {!Array<!proto.xsuportal.proto.resources.Contestant>}
 */
proto.xsuportal.proto.resources.Team.prototype.getMembersList = function() {
  return /** @type{!Array<!proto.xsuportal.proto.resources.Contestant>} */ (
    jspb.Message.getRepeatedWrapperField(this, xsuportal_resources_contestant_pb.Contestant, 17));
};


/**
 * @param {!Array<!proto.xsuportal.proto.resources.Contestant>} value
 * @return {!proto.xsuportal.proto.resources.Team} returns this
*/
proto.xsuportal.proto.resources.Team.prototype.setMembersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 17, value);
};


/**
 * @param {!proto.xsuportal.proto.resources.Contestant=} opt_value
 * @param {number=} opt_index
 * @return {!proto.xsuportal.proto.resources.Contestant}
 */
proto.xsuportal.proto.resources.Team.prototype.addMembers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 17, opt_value, proto.xsuportal.proto.resources.Contestant, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.xsuportal.proto.resources.Team} returns this
 */
proto.xsuportal.proto.resources.Team.prototype.clearMembersList = function() {
  return this.setMembersList([]);
};


goog.object.extend(exports, proto.xsuportal.proto.resources);
