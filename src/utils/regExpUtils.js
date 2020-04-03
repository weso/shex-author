const PN_CHARS_BASE = "[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]";
const PN_CHARS_U = PN_CHARS_BASE + "|_";
const PN_CHARS = "(" + PN_CHARS_U + "|-|[0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040])";
const HEX = "[0-9A-Fa-f]";
const PERCENT = "(%" + HEX + HEX + ")";
const PN_LOCAL_ESC = "(\\\\[_~\\.\\-!\\$&'\\(\\)\\*\\+,;=/\\?#@%])";
const PLX = "(" + PERCENT + "|" + PN_LOCAL_ESC + ")";

export const PN_LOCAL = "(" + PN_CHARS_U +"|:|[0-9]|" +PLX +")(" +PN_CHARS +"|\\.|:|" +PLX+")*";
export const IRI_REF = '[^<>"`\|\{\}\^\\\x00-\x20]*'; //REMOVED '<' AND '>'