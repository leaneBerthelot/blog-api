const ResponseMessages = {};

ResponseMessages.INVALID_POST_BODY = "Post body is invalid";
ResponseMessages.INVALID_POST_BODY_LENGTH = (minLength, maxLength) => `Post body length must be between ${minLength} and ${maxLength} characters`;
ResponseMessages.POST_NOT_FOUND = "Post not found";
ResponseMessages.POST_UPDATED = "Post updated";

module.exports = ResponseMessages;
