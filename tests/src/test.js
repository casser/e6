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

import {Entity} from 'util';
import {Unicode} from 'unicode';

/**
 * A source file.
 *
 * Immutable.
 */
export class Source extends Entity {
    constructor(settings){
        super(Source.merge({
            lastLine    : 0,
            lastOffset  : -1
        },settings));
    }
    get name(){
        return this.$.name
    }
    get content(){
        return this.$.content
    }
    get table(){
        Object.defineProperty(this,'table',{
            value : ((source)=>{
                var offsets = [0];
                var k = 1;
                for (var index = 0; index < source.length; index++) {
                    var code = source.charCodeAt(index);
                    if (Unicode.isLineTerminator(code)) {
                        if (code === 13) {  // \r
                            if(source.charCodeAt(index + 1) === 10){// \n
                                index++;
                            }
                        }
                        offsets[k++] = index;
                    }
                }
                offsets[k++] = source.length;
                return offsets;
            })(this.content)
        });
        return this.table;
    }
    getPosition(offset) {
        if(offset<=0){
            return {line:1,column:0}
        }else{
            var line,column;
            for (line = 0; line < this.table.length; line++) {
                if (offset <= this.table[line]) {
                    break;
                }
            }
            column = offset-this.table[line-1];
            return {line:line,column:column};
        }
    }
    getLocation(startOffset, endOffset) {
        return {
            start :this.getPosition(startOffset),
            end   :this.getPosition(endOffset)
        }
    }
}
