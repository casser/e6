// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Entity} from '../util/Entity';
import {ValueParser} from '../util/ValueParser';


class TokenType {
  //keywords
  get AS                         (){ return 'as';                 }
  get ASYNC                      (){ return 'async';              }
  get AWAIT                      (){ return 'await';              }
  get BREAK                      (){ return 'break';              }
  get CASE                       (){ return 'case';               }
  get CATCH                      (){ return 'catch';              }
  get CLASS                      (){ return 'class';              }
  get CONST                      (){ return 'const';              }
  get CONTINUE                   (){ return 'continue';           }
  get DEBUGGER                   (){ return 'debugger';           }
  get DEFAULT                    (){ return 'default';            }
  get DELETE                     (){ return 'delete';             }
  get DO                         (){ return 'do';                 }
  get ELSE                       (){ return 'else';               }
  get ENUM                       (){ return 'enum';               }
  get EXPORT                     (){ return 'export';             }
  get EXTENDS                    (){ return 'extends';            }
  get FALSE                      (){ return 'false';              }
  get FINALLY                    (){ return 'finally';            }
  get FOR                        (){ return 'for';                }
  get FROM                       (){ return 'from';               }
  get FUNCTION                   (){ return 'function';           }
  get GET                        (){ return 'get';                }
  get IF                         (){ return 'if';                 }
  get IMPLEMENTS                 (){ return 'implements';         }
  get IMPORT                     (){ return 'import';             }
  get IN                         (){ return 'in';                 }
  get INSTANCEOF                 (){ return 'instanceof';         }
  get INTERFACE                  (){ return 'interface';          }
  get LET                        (){ return 'let';                }
  get NAN                        (){ return 'NaN';                }
  get NEW                        (){ return 'new';                }
  get NULL                       (){ return 'null';               }
  get OF                         (){ return 'of';                 }
  get PACKAGE                    (){ return 'package';            }
  get PRIVATE                    (){ return 'private';            }
  get PROTECTED                  (){ return 'protected';          }
  get PUBLIC                     (){ return 'public';             }
  get RETURN                     (){ return 'return';             }
  get SET                        (){ return 'set';                }
  get STATIC                     (){ return 'static';             }
  get SUPER                      (){ return 'super';              }
  get SWITCH                     (){ return 'switch';             }
  get THIS                       (){ return 'this';               }
  get THROW                      (){ return 'throw';              }
  get TRAIT                      (){ return 'trait';              }
  get TRUE                       (){ return 'true';               }
  get TRY                        (){ return 'try';                }
  get TYPEOF                     (){ return 'typeof';             }
  get UNDEFINED                  (){ return 'undefined';          }
  get VAR                        (){ return 'var';                }
  get VOID                       (){ return 'void';               }
  get WHILE                      (){ return 'while';              }
  get WITH                       (){ return 'with';               }
  get YIELD                      (){ return 'yield';              }
  // punctuations
  get AMPERSAND                  (){ return '&';                  }
  get AMPERSAND_EQUAL            (){ return '&=';                 }
  get AND                        (){ return '&&';                 }
  get ARROW                      (){ return '=>';                 }
  get AT                         (){ return '@';                  }
  get BACK_QUOTE                 (){ return '`';                  }
  get BANG                       (){ return '!';                  }
  get BAR                        (){ return '|';                  }
  get BAR_EQUAL                  (){ return '|=';                 }
  get CARET                      (){ return '^';                  }
  get CARET_EQUAL                (){ return '^=';                 }
  get CLOSE_ANGLE                (){ return '>';                  }
  get CLOSE_CURLY                (){ return '}';                  }
  get CLOSE_PAREN                (){ return ')';                  }
  get CLOSE_SQUARE               (){ return ']';                  }
  get COLON                      (){ return ':';                  }
  get COMMA                      (){ return ',';                  }
  get DOT_DOT_DOT                (){ return '...';                }
  get EQUAL                      (){ return '=';                  }
  get EQUAL_EQUAL                (){ return '==';                 }
  get EQUAL_EQUAL_EQUAL          (){ return '===';                }
  get GREATER_EQUAL              (){ return '>=';                 }
  get LEFT_SHIFT                 (){ return '<<';                 }
  get LEFT_SHIFT_EQUAL           (){ return '<<=';                }
  get LESS_EQUAL                 (){ return '<=';                 }
  get MINUS                      (){ return '-';                  }
  get MINUS_EQUAL                (){ return '-=';                 }
  get MINUS_MINUS                (){ return '--';                 }
  get NOT_EQUAL                  (){ return '!=';                 }
  get NOT_EQUAL_EQUAL            (){ return '!==';                }
  get OPEN_ANGLE                 (){ return '<';                  }
  get OPEN_CURLY                 (){ return '{';                  }
  get OPEN_PAREN                 (){ return '(';                  }
  get OPEN_SQUARE                (){ return '[';                  }
  get OR                         (){ return '||';                 }
  get PERCENT                    (){ return '%';                  }
  get PERCENT_EQUAL              (){ return '%=';                 }
  get PERIOD                     (){ return '.';                  }
  get PLUS                       (){ return '+';                  }
  get PLUS_EQUAL                 (){ return '+=';                 }
  get PLUS_PLUS                  (){ return '++';                 }
  get QUESTION                   (){ return '?';                  }
  get RIGHT_SHIFT                (){ return '>>';                 }
  get RIGHT_SHIFT_EQUAL          (){ return '>>=';                }
  get SEMI_COLON                 (){ return ';';                  }
  get SLASH                      (){ return '/';                  }
  get SLASH_EQUAL                (){ return '/=';                 }
  get STAR                       (){ return '*';                  }
  get STAR_EQUAL                 (){ return '*=';                 }
  get STAR_STAR                  (){ return '**';                 }
  get STAR_STAR_EQUAL            (){ return '**=';                }
  get TILDE                      (){ return '«~»';                }
  get UNSIGNED_RIGHT_SHIFT       (){ return '«>>>»';              }
  get UNSIGNED_RIGHT_SHIFT_EQUAL (){ return '«>>>=»';             }
  // specials, identifier and literals
  get END_OF_FILE                (){ return '«eof»';              }
  get ERROR                      (){ return '«error»';            }
  get IDENTIFIER                 (){ return '«identifier»';       }
  get NUMBER                     (){ return '«number»';           }
  get REGEXP                     (){ return '«regexp»';           }
  get STRING                     (){ return '«string»';           }
  get TEMPLATE                   (){ return '«template»';         }
  get TEMPLATE_HEAD              (){ return '«template-head»';    }
  get TEMPLATE_MIDDLE            (){ return '«template-middle»';  }
  get TEMPLATE_TAIL              (){ return '«template-tail»';    }
}

/**
 * A Token in a javascript file.
 * Immutable.
 * A plain old data structure. Should contain data members and simple
 * accessors only.
 */
export class Token extends Entity {
  static get Type():TokenType{
    Object.defineProperty(Token,'Type',{
      value : new TokenType()
    });
    return Token.Type;
  }
  static isKeyword(type) {
    switch (type) {
        case Token.Type.AS:
        case Token.Type.AWAIT:
        case Token.Type.ASYNC:
        case Token.Type.BREAK:
        case Token.Type.CASE:
        case Token.Type.CATCH:
        case Token.Type.CLASS:
        case Token.Type.CONST:
        case Token.Type.CONTINUE:
        case Token.Type.DEBUGGER:
        case Token.Type.DEFAULT:
        case Token.Type.DELETE:
        case Token.Type.DO:
        case Token.Type.ELSE:
        case Token.Type.EXPORT:
        case Token.Type.FINALLY:
        case Token.Type.FOR:
        case Token.Type.FROM:
        case Token.Type.FUNCTION:
        case Token.Type.GET:
        case Token.Type.IF:
        case Token.Type.IMPORT:
        case Token.Type.IN:
        case Token.Type.INSTANCEOF:
        case Token.Type.LET:
        case Token.Type.NAN:
        case Token.Type.NEW:
        case Token.Type.OF:
        case Token.Type.RETURN:
        case Token.Type.SET:
        case Token.Type.SUPER:
        case Token.Type.SWITCH:
        case Token.Type.THIS:
        case Token.Type.THROW:
        case Token.Type.TRAIT:
        case Token.Type.TRY:
        case Token.Type.TYPEOF:
        case Token.Type.VAR:
        case Token.Type.VOID:
        case Token.Type.WHILE:
        case Token.Type.WITH:
        case Token.Type.ENUM:
        case Token.Type.EXTENDS:
        case Token.Type.NULL:
        case Token.Type.TRUE:
        case Token.Type.FALSE:
        case Token.Type.IMPLEMENTS:
        case Token.Type.INTERFACE:
        case Token.Type.PACKAGE:
        case Token.Type.PRIVATE:
        case Token.Type.PROTECTED:
        case Token.Type.PUBLIC:
        case Token.Type.STATIC:
        case Token.Type.UNDEFINED:
        case Token.Type.YIELD:
        return true;
    }
    return false;
  }
  static isStrictKeyword(type) {
    switch (type) {
      case Token.Type.IMPLEMENTS:
      case Token.Type.INTERFACE:
      case Token.Type.PACKAGE:
      case Token.Type.PRIVATE:
      case Token.Type.PROTECTED:
      case Token.Type.PUBLIC:
      case Token.Type.STATIC:
      case Token.Type.YIELD:
        return true;
    }
    return false;
  }
  static isAssignmentOperator(type) {
    switch (type) {
      case Token.Type.AMPERSAND_EQUAL:
      case Token.Type.BAR_EQUAL:
      case Token.Type.CARET_EQUAL:
      case Token.Type.EQUAL:
      case Token.Type.LEFT_SHIFT_EQUAL:
      case Token.Type.MINUS_EQUAL:
      case Token.Type.PERCENT_EQUAL:
      case Token.Type.PLUS_EQUAL:
      case Token.Type.RIGHT_SHIFT_EQUAL:
      case Token.Type.SLASH_EQUAL:
      case Token.Type.STAR_EQUAL:
      case Token.Type.STAR_STAR_EQUAL:
      case Token.Type.UNSIGNED_RIGHT_SHIFT_EQUAL:
        return true;
    }
    return false;
  }
  static isLiteral(type) {
    switch (type) {
      case Token.Type.NULL:
      case Token.Type.TRUE:
      case Token.Type.FALSE:
      case Token.Type.NUMBER:
      case Token.Type.STRING:
      case Token.Type.REGEXP:
      case Token.Type.IDENTIFIER:
      case Token.Type.TEMPLATE:
      case Token.Type.TEMPLATE_HEAD:
      case Token.Type.TEMPLATE_MIDDLE:
      case Token.Type.TEMPLATE_TAIL:
        return true;
    }
    return false;
  }
  get lta(){
    return this.$.lta;
  }
  set lta(v){
    this.$.lta = v;
  }
  get ltb(){
    return this.$.ltb;
  }
  set ltb(v){
    this.$.ltb = v;
  }
  get range(){
    return this.$.range;
  }
  get source():Source{
    return this.$.source;
  }
  get type(){
    return this.$.type
  }
  get text(){
    Object.defineProperty(this,'text',{
      value:this.source.content.substring(
          this.range[0],
          this.range[1]
      )
    });
    return this.text;
  }
  get location(){
    if(!this.$.location){
      this.$.location= this.source.getLocation(...this.range)
    }
    return this.$.location;
  }
  get value() {
    switch (this.type) {
      case Token.Type.NULL                :
        return null;
      case Token.Type.TRUE                :
        return true;
      case Token.Type.FALSE               :
        return false;
      case Token.Type.REGEXP  :
        return ValueParser.parseRegExp(this.text);
      case Token.Type.NUMBER              :
        return ValueParser.parseNumber(this.text);
      case Token.Type.STRING              :
        return ValueParser.parseString(this.text);
      case Token.Type.IDENTIFIER              :
        return this.text;
      default                             :
        throw new Error('not a literal');
    }
  }
  toString() {
    return this.toXML();
  }
  inspect(){
    return this.toString();
  }
  asIdentifier(){
    this.$.type = Token.Type.IDENTIFIER;
  }
  isAssignmentOperator() {
    return Token.isAssignmentOperator(this.type);
  }
  isLiteral(){
    return Token.isLiteral(this.type)
  }
  isKeyword() {
    return Token.isKeyword(this.type);
  }
  isStrictKeyword() {
    return Token.isStrictKeyword(this.type);
  }
  toJSON(){
    return `${this.type}${this.isLiteral()?` «${this.text}»`:''}`;
  }
  toXML(l=0,pl=false){
    var tab = Entity.repeat(l);
    var sLoc = `${this.location.start.line}:${this.location.start.column}`;
    var eLoc = `${this.location.end.line}:${this.location.end.column}`;
    var lt   = `lt="${this.ltb?'y':'n'}${this.lta?'y':'n'}"`;
    var loc  = pl?` ${lt} pos="${this.range.join('-')}" loc="${sLoc}-${eLoc}"`:'';

    if(this.isLiteral()) {
      return `${tab}<Token${loc} type="${this.type}">${this.text}</Token>`
    }else{
      return `${tab}<Token${loc} type="${this.type}"/>`
    }
  }
}
