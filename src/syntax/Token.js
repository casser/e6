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
  constructor(type,name,text){
    this.type = type;
    this.name = name;
    this.text = text;
  }
}
class TokenTypes {
    constructor(){
        this.KEYWORDS = {};
        this.$={},[
            new TokenType( 1, 'AS'                          ,'as'                 ),
            new TokenType( 1, 'ASYNC'                       ,'async'              ),
            new TokenType( 1, 'AWAIT'                       ,'await'              ),
            new TokenType( 1, 'BREAK'                       ,'break'              ),
            new TokenType( 1, 'CASE'                        ,'case'               ),
            new TokenType( 1, 'CATCH'                       ,'catch'              ),
            new TokenType( 1, 'CLASS'                       ,'class'              ),
            new TokenType( 1, 'CONST'                       ,'const'              ),
            new TokenType( 1, 'CONTINUE'                    ,'continue'           ),
            new TokenType( 1, 'DEBUGGER'                    ,'debugger'           ),
            new TokenType( 1, 'DEFAULT'                     ,'default'            ),
            new TokenType( 1, 'DELETE'                      ,'delete'             ),
            new TokenType( 1, 'DO'                          ,'do'                 ),
            new TokenType( 1, 'ELSE'                        ,'else'               ),
            new TokenType( 1, 'ENUM'                        ,'enum'               ),
            new TokenType( 1, 'EXPORT'                      ,'export'             ),
            new TokenType( 1, 'EXTENDS'                     ,'extends'            ),
            new TokenType( 1, 'FALSE'                       ,'false'              ),
            new TokenType( 1, 'FINALLY'                     ,'finally'            ),
            new TokenType( 1, 'FOR'                         ,'for'                ),
            new TokenType( 1, 'FROM'                        ,'from'               ),
            new TokenType( 1, 'FUNCTION'                    ,'function'           ),
            new TokenType( 1, 'GET'                         ,'get'                ),
            new TokenType( 1, 'IF'                          ,'if'                 ),
            new TokenType( 1, 'IMPLEMENTS'                  ,'implements'         ),
            new TokenType( 1, 'IMPORT'                      ,'import'             ),
            new TokenType( 1, 'IN'                          ,'in'                 ),
            new TokenType( 1, 'INSTANCEOF'                  ,'instanceof'         ),
            new TokenType( 1, 'INTERFACE'                   ,'interface'          ),
            new TokenType( 1, 'LET'                         ,'let'                ),
            new TokenType( 1, 'NAN'                         ,'NaN'                ),
            new TokenType( 1, 'NEW'                         ,'new'                ),
            new TokenType( 1, 'NULL'                        ,'null'               ),
            new TokenType( 1, 'OF'                          ,'of'                 ),
            new TokenType( 1, 'PACKAGE'                     ,'package'            ),
            new TokenType( 1, 'PRIVATE'                     ,'private'            ),
            new TokenType( 1, 'PROTECTED'                   ,'protected'          ),
            new TokenType( 1, 'PUBLIC'                      ,'public'             ),
            new TokenType( 1, 'RETURN'                      ,'return'             ),
            new TokenType( 1, 'SET'                         ,'set'                ),
            new TokenType( 1, 'STATIC'                      ,'static'             ),
            new TokenType( 1, 'SUPER'                       ,'super'              ),
            new TokenType( 1, 'SWITCH'                      ,'switch'             ),
            new TokenType( 1, 'THIS'                        ,'this'               ),
            new TokenType( 1, 'THROW'                       ,'throw'              ),
            new TokenType( 1, 'TRAIT'                       ,'trait'              ),
            new TokenType( 1, 'TRUE'                        ,'true'               ),
            new TokenType( 1, 'TRY'                         ,'try'                ),
            new TokenType( 1, 'TYPEOF'                      ,'typeof'             ),
            new TokenType( 1, 'UNDEFINED'                   ,'undefined'          ),
            new TokenType( 1, 'VAR'                         ,'var'                ),
            new TokenType( 1, 'VOID'                        ,'void'               ),
            new TokenType( 1, 'WHILE'                       ,'while'              ),
            new TokenType( 1, 'WITH'                        ,'with'               ),
            new TokenType( 1, 'YIELD'                       ,'yield'              ),
            new TokenType( 2, 'AMPERSAND'                   , '&'                 ),
            new TokenType( 2, 'AMPERSAND_EQUAL'             , '&='                ),
            new TokenType( 2, 'AND'                         , '&&'                ),
            new TokenType( 2, 'ARROW'                       , '=>'                ),
            new TokenType( 2, 'AT'                          , '@'                 ),
            new TokenType( 2, 'BACK_QUOTE'                  , '`'                 ),
            new TokenType( 2, 'BANG'                        , '!'                 ),
            new TokenType( 2, 'BAR'                         , '|'                 ),
            new TokenType( 2, 'BAR_EQUAL'                   , '|='                ),
            new TokenType( 2, 'CARET'                       , '^'                 ),
            new TokenType( 2, 'CARET_EQUAL'                 , '^='                ),
            new TokenType( 2, 'CLOSE_ANGLE'                 , '>'                 ),
            new TokenType( 2, 'CLOSE_CURLY'                 , '}'                 ),
            new TokenType( 2, 'CLOSE_PAREN'                 , ')'                 ),
            new TokenType( 2, 'CLOSE_SQUARE'                , ']'                 ),
            new TokenType( 2, 'COLON'                       , ':'                 ),
            new TokenType( 2, 'COMMA'                       , ','                 ),
            new TokenType( 2, 'DOT_DOT_DOT'                 , '...'               ),
            new TokenType( 2, 'EQUAL'                       , '='                 ),
            new TokenType( 2, 'EQUAL_EQUAL'                 , '=='                ),
            new TokenType( 2, 'EQUAL_EQUAL_EQUAL'           , '==='               ),
            new TokenType( 2, 'GREATER_EQUAL'               , '>='                ),
            new TokenType( 2, 'LEFT_SHIFT'                  , '<<'                ),
            new TokenType( 2, 'LEFT_SHIFT_EQUAL'            , '<<='               ),
            new TokenType( 2, 'LESS_EQUAL'                  , '<='                ),
            new TokenType( 2, 'MINUS'                       , '-'                 ),
            new TokenType( 2, 'MINUS_EQUAL'                 , '-='                ),
            new TokenType( 2, 'MINUS_MINUS'                 , '--'                ),
            new TokenType( 2, 'NOT_EQUAL'                   , '!='                ),
            new TokenType( 2, 'NOT_EQUAL_EQUAL'             , '!=='               ),
            new TokenType( 2, 'OPEN_ANGLE'                  , '<'                 ),
            new TokenType( 2, 'OPEN_CURLY'                  , '{'                 ),
            new TokenType( 2, 'OPEN_PAREN'                  , '('                 ),
            new TokenType( 2, 'OPEN_SQUARE'                 , '['                 ),
            new TokenType( 2, 'OR'                          , '||'                ),
            new TokenType( 2, 'PERCENT'                     , '%'                 ),
            new TokenType( 2, 'PERCENT_EQUAL'               , '%='                ),
            new TokenType( 2, 'PERIOD'                      , '.'                 ),
            new TokenType( 2, 'PLUS'                        , '+'                 ),
            new TokenType( 2, 'PLUS_EQUAL'                  , '+='                ),
            new TokenType( 2, 'PLUS_PLUS'                   , '++'                ),
            new TokenType( 2, 'QUESTION'                    , '?'                 ),
            new TokenType( 2, 'RIGHT_SHIFT'                 , '>>'                ),
            new TokenType( 2, 'RIGHT_SHIFT_EQUAL'           , '>>='               ),
            new TokenType( 2, 'SEMI_COLON'                  , ';'                 ),
            new TokenType( 2, 'SLASH'                       , '/'                 ),
            new TokenType( 2, 'SLASH_EQUAL'                 , '/='                ),
            new TokenType( 2, 'STAR'                        , '*'                 ),
            new TokenType( 2, 'STAR_EQUAL'                  , '*='                ),
            new TokenType( 2, 'STAR_STAR'                   , '**'                ),
            new TokenType( 2, 'STAR_STAR_EQUAL'             , '**='               ),
            new TokenType( 2, 'TILDE'                       , '«~»'               ),
            new TokenType( 2, 'UNSIGNED_RIGHT_SHIFT'        , '«>>>»'             ),
            new TokenType( 2, 'UNSIGNED_RIGHT_SHIFT_EQUAL'  , '«>>>=»'            ),
            new TokenType( 3, 'NUMBER'                      , '«number»'          ),
            new TokenType( 3, 'REGEXP'                      , '«regexp»'          ),
            new TokenType( 3, 'STRING'                      , '«string»'          ),
            new TokenType( 3, 'TEMPLATE'                    , '«template»'        ),
            new TokenType( 3, 'TEMPLATE_HEAD'               , '«template-head»'   ),
            new TokenType( 3, 'TEMPLATE_MIDDLE'             , '«template-middle»' ),
            new TokenType( 3, 'TEMPLATE_TAIL'               , '«template-tail»'   ),
            new TokenType( 3, 'IDENTIFIER'                  , '«identifier»'      ),
            new TokenType( 4, 'END_OF_FILE'                 , '«eof»'             ),
            new TokenType( 4, 'ERROR'                       , '«error»'           )
        ].forEach((type)=>{
            this.$[type.name] = type;
            if(type.type==1){
                this.KEYWORDS[type.text]=type;
            }
        });
      }
    //keywords
    get AS                         (){ return this.$.AS                         }
    get ASYNC                      (){ return this.$.ASYNC                      }
    get AWAIT                      (){ return this.$.AWAIT                      }
    get BREAK                      (){ return this.$.BREAK                      }
    get CASE                       (){ return this.$.CASE                       }
    get CATCH                      (){ return this.$.CATCH                      }
    get CLASS                      (){ return this.$.CLASS                      }
    get CONST                      (){ return this.$.CONST                      }
    get CONTINUE                   (){ return this.$.CONTINUE                   }
    get DEBUGGER                   (){ return this.$.DEBUGGER                   }
    get DEFAULT                    (){ return this.$.DEFAULT                    }
    get DELETE                     (){ return this.$.DELETE                     }
    get DO                         (){ return this.$.DO                         }
    get ELSE                       (){ return this.$.ELSE                       }
    get ENUM                       (){ return this.$.ENUM                       }
    get EXPORT                     (){ return this.$.EXPORT                     }
    get EXTENDS                    (){ return this.$.EXTENDS                    }
    get FALSE                      (){ return this.$.FALSE                      }
    get FINALLY                    (){ return this.$.FINALLY                    }
    get FOR                        (){ return this.$.FOR                        }
    get FROM                       (){ return this.$.FROM                       }
    get FUNCTION                   (){ return this.$.FUNCTION                   }
    get GET                        (){ return this.$.GET                        }
    get IF                         (){ return this.$.IF                         }
    get IMPLEMENTS                 (){ return this.$.IMPLEMENTS                 }
    get IMPORT                     (){ return this.$.IMPORT                     }
    get IN                         (){ return this.$.IN                         }
    get INSTANCEOF                 (){ return this.$.INSTANCEOF                 }
    get INTERFACE                  (){ return this.$.INTERFACE                  }
    get LET                        (){ return this.$.LET                        }
    get NAN                        (){ return this.$.NAN                        }
    get NEW                        (){ return this.$.NEW                        }
    get NULL                       (){ return this.$.NULL                       }
    get OF                         (){ return this.$.OF                         }
    get PACKAGE                    (){ return this.$.PACKAGE                    }
    get PRIVATE                    (){ return this.$.PRIVATE                    }
    get PROTECTED                  (){ return this.$.PROTECTED                  }
    get PUBLIC                     (){ return this.$.PUBLIC                     }
    get RETURN                     (){ return this.$.RETURN                     }
    get SET                        (){ return this.$.SET                        }
    get STATIC                     (){ return this.$.STATIC                     }
    get SUPER                      (){ return this.$.SUPER                      }
    get SWITCH                     (){ return this.$.SWITCH                     }
    get THIS                       (){ return this.$.THIS                       }
    get THROW                      (){ return this.$.THROW                      }
    get TRAIT                      (){ return this.$.TRAIT                      }
    get TRUE                       (){ return this.$.TRUE                       }
    get TRY                        (){ return this.$.TRY                        }
    get TYPEOF                     (){ return this.$.TYPEOF                     }
    get UNDEFINED                  (){ return this.$.UNDEFINED                  }
    get VAR                        (){ return this.$.VAR                        }
    get VOID                       (){ return this.$.VOID                       }
    get WHILE                      (){ return this.$.WHILE                      }
    get WITH                       (){ return this.$.WITH                       }
    get YIELD                      (){ return this.$.YIELD                      }
    get AMPERSAND                  (){ return this.$.AMPERSAND                  }
    get AMPERSAND_EQUAL            (){ return this.$.AMPERSAND_EQUAL            }
    get AND                        (){ return this.$.AND                        }
    get ARROW                      (){ return this.$.ARROW                      }
    get AT                         (){ return this.$.AT                         }
    get BACK_QUOTE                 (){ return this.$.BACK_QUOTE                 }
    get BANG                       (){ return this.$.BANG                       }
    get BAR                        (){ return this.$.BAR                        }
    get BAR_EQUAL                  (){ return this.$.BAR_EQUAL                  }
    get CARET                      (){ return this.$.CARET                      }
    get CARET_EQUAL                (){ return this.$.CARET_EQUAL                }
    get CLOSE_ANGLE                (){ return this.$.CLOSE_ANGLE                }
    get CLOSE_CURLY                (){ return this.$.CLOSE_CURLY                }
    get CLOSE_PAREN                (){ return this.$.CLOSE_PAREN                }
    get CLOSE_SQUARE               (){ return this.$.CLOSE_SQUARE               }
    get COLON                      (){ return this.$.COLON                      }
    get COMMA                      (){ return this.$.COMMA                      }
    get DOT_DOT_DOT                (){ return this.$.DOT_DOT_DOT                }
    get EQUAL                      (){ return this.$.EQUAL                      }
    get EQUAL_EQUAL                (){ return this.$.EQUAL_EQUAL                }
    get EQUAL_EQUAL_EQUAL          (){ return this.$.EQUAL_EQUAL_EQUAL          }
    get GREATER_EQUAL              (){ return this.$.GREATER_EQUAL              }
    get LEFT_SHIFT                 (){ return this.$.LEFT_SHIFT                 }
    get LEFT_SHIFT_EQUAL           (){ return this.$.LEFT_SHIFT_EQUAL           }
    get LESS_EQUAL                 (){ return this.$.LESS_EQUAL                 }
    get MINUS                      (){ return this.$.MINUS                      }
    get MINUS_EQUAL                (){ return this.$.MINUS_EQUAL                }
    get MINUS_MINUS                (){ return this.$.MINUS_MINUS                }
    get NOT_EQUAL                  (){ return this.$.NOT_EQUAL                  }
    get NOT_EQUAL_EQUAL            (){ return this.$.NOT_EQUAL_EQUAL            }
    get OPEN_ANGLE                 (){ return this.$.OPEN_ANGLE                 }
    get OPEN_CURLY                 (){ return this.$.OPEN_CURLY                 }
    get OPEN_PAREN                 (){ return this.$.OPEN_PAREN                 }
    get OPEN_SQUARE                (){ return this.$.OPEN_SQUARE                }
    get OR                         (){ return this.$.OR                         }
    get PERCENT                    (){ return this.$.PERCENT                    }
    get PERCENT_EQUAL              (){ return this.$.PERCENT_EQUAL              }
    get PERIOD                     (){ return this.$.PERIOD                     }
    get PLUS                       (){ return this.$.PLUS                       }
    get PLUS_EQUAL                 (){ return this.$.PLUS_EQUAL                 }
    get PLUS_PLUS                  (){ return this.$.PLUS_PLUS                  }
    get QUESTION                   (){ return this.$.QUESTION                   }
    get RIGHT_SHIFT                (){ return this.$.RIGHT_SHIFT                }
    get RIGHT_SHIFT_EQUAL          (){ return this.$.RIGHT_SHIFT_EQUAL          }
    get SEMI_COLON                 (){ return this.$.SEMI_COLON                 }
    get SLASH                      (){ return this.$.SLASH                      }
    get SLASH_EQUAL                (){ return this.$.SLASH_EQUAL                }
    get STAR                       (){ return this.$.STAR                       }
    get STAR_EQUAL                 (){ return this.$.STAR_EQUAL                 }
    get STAR_STAR                  (){ return this.$.STAR_STAR                  }
    get STAR_STAR_EQUAL            (){ return this.$.STAR_STAR_EQUAL            }
    get TILDE                      (){ return this.$.TILDE                      }
    get UNSIGNED_RIGHT_SHIFT       (){ return this.$.UNSIGNED_RIGHT_SHIFT       }
    get UNSIGNED_RIGHT_SHIFT_EQUAL (){ return this.$.UNSIGNED_RIGHT_SHIFT_EQUAL }
    get END_OF_FILE                (){ return this.$.END_OF_FILE                }
    get ERROR                      (){ return this.$.ERROR                      }
    get IDENTIFIER                 (){ return this.$.IDENTIFIER                 }
    get NUMBER                     (){ return this.$.NUMBER                     }
    get REGEXP                     (){ return this.$.REGEXP                     }
    get STRING                     (){ return this.$.STRING                     }
    get TEMPLATE                   (){ return this.$.TEMPLATE                   }
    get TEMPLATE_HEAD              (){ return this.$.TEMPLATE_HEAD              }
    get TEMPLATE_MIDDLE            (){ return this.$.TEMPLATE_MIDDLE            }
    get TEMPLATE_TAIL              (){ return this.$.TEMPLATE_TAIL              }
}

/**
 * A Token in a javascript file.
 * Immutable.
 * A plain old data structure. Should contain data members and simple
 * accessors only.
 */
export class Token extends Entity {
  static get Type():TokenTypes{
    Object.defineProperty(Token,'Type',{
      value : new TokenTypes()
    });
    return Token.Type;
  }
  static isKeyword(type) {
      return Token.Type.KEYWORDS[type];
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
  get name(){
    return this.type.name
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

    return `${tab}<${this.name}${loc} text=${JSON.stringify(this.text)}/>`
  }
}
