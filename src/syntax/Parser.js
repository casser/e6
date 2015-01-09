import {Entity}     from '../util/Entity';
import {Options}    from '../Options';
import {Scanner}    from './Scanner';
import {Token}      from './Token';
import {Ast}        from './Ast';
import {Builder}    from './Builder';
export {Parser};

class Parser extends Entity {
    //<editor-fold desc="General">
    get options ():Options{
        return this.$.options;
    }
    get source  ():Source{
        return this.$.source;
    }
    get builder ():Builder{
        return this.$.builder;
    }
    constructor({source,options}) {
        super({
            source,options,
            builder : new Builder({
                source,options,
                parser:this
            })
        });
    }
    get token():Token{
        return this.builder.token;
    }
    error(message){
        throw new Error(message);
    }
    is(type:Function):Boolean{
        return this.token.type==type;
    }
    isIn(...types:Function):Boolean{
        for(var type of types){
            if(this.token.type==type){
                return true
            }
        }
        return false;
    }
    eat(type:Function):Marker{
        if(this.is(type)){
            return this.builder.eat(type);
        }
        this.error(`Expected token '${type}' but got token '${this.token.type}'`)
    }
    eatAny(...types:Function):Marker{
        for(var type of types){
            if(this.is(type)){
                return this.eat(type);
            }
        }
        this.error(`Expected tokens are [${type.map((a)=>a.type).join(',')}] but got token ${this.token.type}`)
    }
    eatAll(...types:Function):Marker{
        for(var type of types){
            if(this.is(type)){
                return this.eat(type);
            }else{
                this.error(`Expected tokens are [${type.map((a)=>a.type).join(',')}] but got token ${this.token.type}`)
            }
        }
    }
    eatIf(type:Function){
        if(this.is(type)){
            this.eat(type);
            return true;
        }else{
            return false;
        }
    }
    eatIfAny(...types:Function):Marker{
        for(var type of types){
            if(this.is(type)){
                this.eat(type);
                return true;
            }
        }
        return false;
    }
    eatSemi() {
        switch (this.token.type) {
            case Token.Type.SEMI_COLON  : return this.eat(Token.Type.SEMI_COLON);
            case Token.Type.END_OF_FILE :
            case Token.Type.CLOSE_CURLY : return;
        }
        if (!this.token.ltb){
            this.error(`Semi-colon expected got '${this.token.type}' ${this.token.ltb}`);
        }
    }
    isSemi(){
        switch (this.token.type) {
            case Token.Type.SEMI_COLON  :
            case Token.Type.END_OF_FILE :
            case Token.Type.CLOSE_CURLY : return true;
            default                     : return this.token.ltb;
        }
    }
    mark(node:Function):Marker{
        return this.builder.mark(node);
    }
    parse():Boolean{
        if(this.parseModule()){
            return this.builder.tree;
        }
    }
    //</editor-fold>
    //<editor-fold desc="Literals">
    parseIdentifier(){
        var marker = this.mark(Ast.Identifier);
        this.eat(Token.Type.IDENTIFIER);
        return marker.done(Ast.Identifier);
    }
    //</editor-fold>
    //<editor-fold desc="Module">
    parseModule() {
        var marker = this.mark(Ast.Module);
        while(!this.is(Token.Type.END_OF_FILE)) {
            switch (this.token.type) {
                case Token.Type.IMPORT  : this.parseImportDeclaration(); break;
                case Token.Type.EXPORT  : this.parseExportDeclaration(); break;
                default                 : this.parseStatement();
            }
        }
        return marker.done(Ast.Module);
    }
    parseModuleSpecifier() {
        var marker = this.mark(Ast.ModuleSpecifier);
        this.eat(Token.Type.STRING);
        return marker.done(Ast.ModuleSpecifier);
    }
    //<editor-fold desc="Imports Parsing">
    parseImportDeclaration() {
        var marker = this.mark(Ast.ImportDeclaration);
        this.eat(Token.Type.IMPORT);
        if(this.is(Token.Type.STAR)){
            let marker = this.mark(Ast.NamespaceImport);
            this.eat(Token.Type.STAR);
            if(this.eatIf(Token.Type.AS)){
                this.parseIdentifier();
            }
            marker.done(Ast.NamespaceImport);
            if(this.eatIf(Token.Type.COMMA)) {
                this.parseImportSpecifiers();
            }
        } else
        if(this.is(Token.Type.IDENTIFIER)){
            let marker = this.mark(Ast.DefaultImport);
            this.parseIdentifier();
            if(this.eatIf(Token.Type.AS)){
                this.parseIdentifier();
            }
            marker.done(Ast.DefaultImport);
            if(this.eatIf(Token.Type.COMMA)) {
                this.parseImportSpecifiers();
            }
        }else
        if(this.is(Token.Type.OPEN_CURLY)) {
            if(this.if(Token.Type.OPEN_CURLY)) {
                this.parseImportSpecifiers();
            }
            this.eat(Token.Type.FROM);
        }
        this.eat(Token.Type.FROM);
        this.parseModuleSpecifier();
        this.eatSemi();
        return marker.done(Ast.ImportDeclaration);
    }
    parseImportSpecifiers(){
        this.eat(Token.Type.OPEN_CURLY);
        this.parseImportSpecifier();
        while (this.eatIf(Token.Type.COMMA)) {
            this.parseImportSpecifier();
        }
        this.eat(Token.Type.CLOSE_CURLY);
    }
    parseImportSpecifier() {
        var marker = this.mark(Ast.ImportSpecifier);
        this.parseIdentifier();
        if(this.eatIf(Token.Type.AS)){
            this.parseIdentifier();
        }
        return marker.done(Ast.ImportSpecifier);
    }
    //</editor-fold>
    //<editor-fold desc="Export Parsing">
    parseExportDeclaration() {
        var marker = this.mark(Ast.ExportDeclaration);
        this.eat(Token.Type.EXPORT);
        if(this.is(Token.Type.VAR)){
            this.parseVariableStatement();
        } else
        if(this.is(Token.Type.CONST)){
            this.parseVariableStatement();
        } else
        if(this.is(Token.Type.LET)){
            this.parseVariableStatement();
        } else
        if(this.is(Token.Type.FUNCTION)){
            this.parseFunctionDeclaration();
        } else
        if(this.is(Token.Type.CLASS)){
            this.parseClassDeclaration();
        } else
        if(this.is(Token.Type.DEFAULT)){
            this.parseExportDefault();
        } else
        if(this.is(Token.Type.STAR)){
            let marker = this.mark(Ast.NamespaceExport);
            this.eat(Token.Type.STAR);
            if(this.eatIf(Token.Type.AS)){
                this.parseIdentifier();
            }
            marker.done(Ast.NamespaceExport);
            if(this.eatIf(Token.Type.COMMA)) {
                this.parseExportSpecifiers();
            }
            if(this.eatIf(Token.Type.FROM)){
                this.parseModuleSpecifier();
            }
        } else
        if(this.is(Token.Type.OPEN_CURLY)) {
            this.parseExportSpecifiers();
            if(this.eatIf(Token.Type.FROM)){
                this.parseModuleSpecifier();
            }
            if(this.eatIf(Token.Type.FROM)){
                this.parseModuleSpecifier();
            }
        }else{
            this.parseUnexpectedToken();
        }
        this.eatSemi();
        return marker.done(Ast.ExportDeclaration);
    }
    parseExportSpecifiers() {
        this.eat(Token.Type.OPEN_CURLY);
        this.parseExportSpecifier();
        while (this.eatIf(Token.Type.COMMA)) {
            this.parseExportSpecifier();
        }
        this.eat(Token.Type.CLOSE_CURLY);
    }
    parseExportSpecifier() {
        var marker = this.mark(Ast.ExportSpecifier);
        this.parseIdentifier();
        if(this.eatIf(Token.Type.AS)){
            this.parseIdentifier();
        }
        return marker.done(Ast.ExportSpecifier);
    }
    // </editor-fold>
    // </editor-fold>
    //<editor-fold desc="Statements">
    parseStatement(){
        var marker = false,token=this.token.type;
        switch (token) {
            case Token.Type.AT          : marker = this.parseAnnotations();          break;
            // declarations
            case Token.Type.CONST       :
            case Token.Type.LET         :
            case Token.Type.VAR         : marker = this.parseVariableDeclaration();  break;
            case Token.Type.FUNCTION    : marker = this.parseFunctionDeclaration();  break;
            case Token.Type.CLASS       : marker = this.parseClassDeclaration();     break;
            case Token.Type.TRAIT       : marker = this.parseTraitDeclaration();     break;
            case Token.Type.INTERFACE   : marker = this.parseInterfaceDeclaration(); break;
            // statements
            case Token.Type.IF          : marker = this.parseIfStatement();          break;
            case Token.Type.FOR         : marker = this.parseForStatement();         break;
            case Token.Type.SWITCH      : marker = this.parseSwitchStatement();      break;
            case Token.Type.WHILE       : marker = this.parseWhileStatement();       break;
            case Token.Type.DO          : marker = this.parseDoWhileStatement();     break;
            case Token.Type.TRY         : marker = this.parseTryStatement();         break;
            case Token.Type.WITH        : marker = this.parseWithStatement();        break;
            case Token.Type.OPEN_CURLY  : marker = this.parseBlockStatement();       break;
            case Token.Type.RETURN      : marker = this.parseReturnStatement();      break;
            case Token.Type.BREAK       : marker = this.parseBreakStatement();       break;
            case Token.Type.THROW       : marker = this.parseThrowStatement();       break;
            case Token.Type.CONTINUE    : marker = this.parseContinueStatement();    break;
            case Token.Type.DEBUGGER    : marker = this.parseDebuggerStatement();    break;
            case Token.Type.SEMI_COLON  : marker = this.parseEmptyStatement();       break;
            // fall through expressions
            default                     : marker = this.parseExpressionStatement();  break;
        }
        marker.shift(Ast.Annotations);
        return marker;
    }
    parseExpressionStatement() {
        var marker = this.mark(Ast.ExpressionStatement);
        this.parseExpression();
        this.eatSemi();
        return marker.done(Ast.ExpressionStatement);
    }
    parseBlockStatement(){
        var marker = this.mark(Ast.BlockStatement);
        this.eat(Token.Type.OPEN_CURLY);
        while(!this.is(Token.Type.CLOSE_CURLY)){
            this.parseStatement();
        }
        this.eat(Token.Type.CLOSE_CURLY);
        return marker.done(Ast.BlockStatement);
    }
    parseIfStatement(){
        var marker = this.mark(Ast.IfStatement);
        this.eat(Token.Type.IF);
        this.eat(Token.Type.OPEN_PAREN);
        this.parseExpression();
        this.eat(Token.Type.CLOSE_PAREN);
        this.parseStatement();
        if(this.eatIf(Token.Type.ELSE)){
            this.parseStatement();
        }
        return marker.done(Ast.IfStatement);
    }
    parseWithStatement(){
        var marker = this.mark(Ast.WithStatement);
        this.eat(Token.Type.WITH);
        this.eat(Token.Type.OPEN_PAREN);
        this.parseExpression();
        this.eat(Token.Type.CLOSE_PAREN);
        this.parseStatement();
        return marker.done(Ast.WithStatement);
    }
    parseWhileStatement(){
        var marker = this.mark(Ast.WhileStatement);
        this.eat(Token.Type.WHILE);
        this.eat(Token.Type.OPEN_PAREN);
        this.parseExpression();
        this.eat(Token.Type.CLOSE_PAREN);
        this.parseStatement();
        return marker.done(Ast.WhileStatement);
    }
    parseDoWhileStatement(){
        var marker = this.mark(Ast.DoWhileStatement);
        this.eat(Token.Type.DO);
        this.parseStatement();
        this.eat(Token.Type.WHILE);
        this.eat(Token.Type.OPEN_PAREN);
        this.parseExpression();
        this.eat(Token.Type.CLOSE_PAREN);
        this.eatIf(Token.Type.SEMI_COLON);
        return marker.done(Ast.DoWhileStatement);
    }
    parseReturnStatement(){
        var marker = this.mark(Ast.ReturnStatement);
        this.eat(Token.Type.RETURN);
        if(!this.isSemi()){
            this.parseExpression();
        }
        this.eatSemi();
        return marker.done(Ast.ReturnStatement);
    }
    parseThrowStatement(){
        var marker = this.mark(Ast.ThrowStatement);
        this.eat(Token.Type.THROW);
        if(!this.isSemi()){
            this.parseExpression();
        }
        this.eatSemi();
        return marker.done(Ast.ThrowStatement);
    }
    parseBreakStatement(){
        var marker = this.mark(Ast.BreakStatement);
        this.eat(Token.Type.BREAK);
        if(!this.isSemi()){
            this.eatIf(Token.Type.IDENTIFIER);
        }
        this.eatSemi();
        return marker.done(Ast.BreakStatement);
    }
    parseContinueStatement(){
        var marker = this.mark(Ast.ContinueStatement);
        this.eat(Token.Type.CONTINUE);
        if(!this.isSemi()){
            this.eatIf(Token.Type.IDENTIFIER);
        }
        this.eatSemi();
        return marker.done(Ast.ContinueStatement);
    }
    parseDebuggerStatement(){
        var marker = this.mark(Ast.DebuggerStatement);
        this.eat(Token.Type.DEBUGGER);
        this.eatSemi();
        return marker.done(Ast.DebuggerStatement);
    }
    parseEmptyStatement(){
        var marker = this.mark(Ast.EmptyStatement);
        this.eat(Token.Type.SEMI_COLON);
        return marker.done(Ast.EmptyStatement);
    }
    //</editor-fold>
    //<editor-fold desc="Declarations">
    //<editor-fold desc="Variable Declaration">
    parseVariableDeclaration(){
        var marker = this.mark(Ast.VariableDeclaration);
        this.eatAny(Token.Type.VAR,Token.Type.CONST,Token.Type.LET);
        this.parseVariableDeclarator();
        while(this.eatIf(Token.Type.COMMA)) {
            this.parseVariableDeclarator();
        }
        this.eatSemi();
        return marker.done(Ast.VariableDeclaration);
    }
    parseVariableDeclarator() {
        var marker =this.mark(Ast.VariableDeclarator);
        if (this.isIn(Token.Type.OPEN_SQUARE,Token.Type.OPEN_CURLY)) {
            this.parsePattern();
        } else {
            this.parseIdentifier();
            if(this.eatIf(Token.Type.COLON)){
                this.parseTypeAnnotation();
            }
        }
        if(this.eatIf(Token.Type.EQUAL)){
            this.parseAssignmentExpression();
        }
        return marker.done(Ast.VariableDeclarator);
    }
    //</editor-fold>
    //<editor-fold desc="Class Declaration">
    parseClassDeclaration(){
        var marker = this.mark(Ast.ClassDeclaration);
        this.eat(Token.Type.CLASS);
        this.parseIdentifier();
        if(this.eatIf(Token.Type.EXTENDS)){
            this.parseIdentifier();
        }
        this.parseClassBody();
        return marker.done(Ast.ClassDeclaration);
    }
    parseClassBody(){
        var member,marker = this.mark(Ast.ClassBody);
        this.eat(Token.Type.OPEN_CURLY);
        while(!this.is(Token.Type.CLOSE_CURLY)){
            this.parseClassMember();
        }
        this.eat(Token.Type.CLOSE_CURLY);
        return marker.done(Ast.ClassBody);
    }
    parseClassMember(){
        this.parseAnnotations();
        this.parseModifiers();
        var member=false;
        member = member || this.parseClassGetter();
        member = member || this.parseClassSetter();
        member = member || this.parseClassMethod();
        member = member || this.parseClassField();
        member.shift(Ast.Modifiers);
        member.shift(Ast.Annotations);
        this.eatSemi();
        return member;
    }
    parseClassGetter(){
        var marker = this.mark(Ast.ClassGetter);
        if(this.eatIf(Token.Type.GET)){
            this.parseIdentifier();
            this.parseFormalSignature();
            if(this.eatIf(Token.Type.ARROW)){
                this.parseAssignmentExpression();
            }else{
                this.parseBlockStatement();
            }
            return marker.done(Ast.ClassGetter);
        }else{
            return marker.rollback();
        }
    }
    parseClassSetter(){
        var marker = this.mark(Ast.ClassSetter);
        if(this.eatIf(Token.Type.SET)){
            this.parseIdentifier();
            this.parseFormalSignature();
            if(this.eatIf(Token.Type.ARROW)){
                this.parseAssignmentExpression();
            }else{
                this.parseBlockStatement();
            }
            return marker.done(Ast.ClassSetter);
        }else{
            return marker.rollback();
        }
    }
    parseClassMethod(){
        var marker = this.mark(Ast.ClassMethod);
        this.parseIdentifier();
        if(this.is(Token.Type.OPEN_PAREN)){
            this.parseFormalSignature();
            if(this.eatIf(Token.Type.ARROW)){
                this.parseAssignmentExpression();
            }else{
                this.parseBlockStatement();
            }
            return marker.done(Ast.ClassMethod);
        }else{
            return marker.rollback();
        }
    }
    parseClassField(){
        var marker = this.mark(Ast.ClassField);
        this.parseIdentifier();
        if(this.eatIf(Token.Type.COLON)){
            this.parseTypeAnnotation();
        }
        if(this.eatIf(Token.Type.EQUAL)){
            this.parseAssignmentExpression();
        }
        return marker.done(Ast.ClassField);
    }
    parseModifiers(){
        var marker = this.mark(Ast.Modifiers);
        var marked = false;
        while(this.isIn(
            Token.Type.PUBLIC,
            Token.Type.PROTECTED,
            Token.Type.STATIC,
            Token.Type.ASYNC
        )){
            marked = this.mark(Ast.Modifier);
            this.eat(this.token.type);
            marked = marked.done(Ast.Modifier);
        }
        if(marked){
            return marker.done(Ast.Modifiers);
        }else{
            return marker.rollback();
        }
    }
    //</editor-fold>
    //<editor-fold desc="Function Declaration">
    parseFunctionDeclaration(){
        var marker = this.mark(Ast.FunctionDeclaration);
        this.eat(Token.Type.FUNCTION);
        if(this.is(Token.Type.IDENTIFIER)){
            this.parseIdentifier();
        }
        this.parseFormalSignature();
        this.parseBlockStatement();
        
        return marker.done(Ast.FunctionDeclaration);
    }
    parseFormalSignature(){
        var marker = this.mark(Ast.FormalSignature);
        this.eat(Token.Type.OPEN_PAREN);
        if(!this.is(Token.Type.CLOSE_PAREN)){
            this.parseFormalParameter();
            while(this.eatIf(Token.Type.COMMA)){
                this.parseFormalParameter();
            }
        }
        this.eat(Token.Type.CLOSE_PAREN);
        if(this.eatIf(Token.Type.COLON)){
            this.parseTypeAnnotation();
        }
        return marker.done(Ast.FormalSignature);
    }
    parseFormalParameter(){
        var marker = this.mark(Ast.FormalParameter);
        this.parseAnnotations();
        this.parseIdentifier();
        if(this.eatIf(Token.Type.COLON)){
            this.parseTypeAnnotation();
        }
        return marker.done(Ast.FormalParameter);
    }
    //</editor-fold>
    //</editor-fold>
    //<editor-fold desc="Expressions">
    parseExpression(){
        var expression = this.parseAssignmentExpression();
        if(this.is(Token.Type.COMMA)){
            var sequence = this.mark(Ast.SequenceExpression);
            while(this.eatIf(Token.Type.COMMA)){
                this.parseAssignmentExpression();
            }
            sequence.shift();
            sequence.done(Ast.SequenceExpression);
            expression = sequence;
        }
        return expression;
    }
    parseAssignmentExpression(){
        var expression = this.parseConditional();
        if(this.is(Token.Type.ARROW)){
            console.info(expression.node);
            expression.rollback();
            expression = this.parseArrowExpression();
        }else
        if(this.eatIfAny(
            Token.Type.AMPERSAND_EQUAL,
            Token.Type.BAR_EQUAL,
            Token.Type.CARET_EQUAL,
            Token.Type.EQUAL,
            Token.Type.LEFT_SHIFT_EQUAL,
            Token.Type.MINUS_EQUAL,
            Token.Type.PERCENT_EQUAL,
            Token.Type.PLUS_EQUAL,
            Token.Type.RIGHT_SHIFT_EQUAL,
            Token.Type.SLASH_EQUAL,
            Token.Type.STAR_EQUAL,
            Token.Type.STAR_STAR_EQUAL,
            Token.Type.UNSIGNED_RIGHT_SHIFT_EQUAL
        )){
            this.parseAssignmentExpression();
            expression = expression.collapse(Ast.BinaryExpression);
        }

        return expression;
    }
    parseConditional() {
        var condition = this.parseLogicalOR();
        if (this.eatIf(Token.Type.QUESTION)) {
            this.parseAssignmentExpression();
            this.eat(Token.Type.COLON);
            this.parseAssignmentExpression();
            condition.collapse(Ast.ConditionalExpression);
        }
        return condition;
    }
    parseLogicalOR() {
        var left = this.parseLogicalAND();
        while(this.eatIf(Token.Type.OR)) {
            this.parseLogicalAND();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseLogicalAND() {
        var left = this.parseBitwiseOR();
        while(this.eatIf(Token.Type.AND)) {
            this.parseBitwiseOR();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseBitwiseOR() {
        var left = this.parseBitwiseXOR();
        while(this.eatIf(Token.Type.BAR)) {
            this.parseBitwiseXOR();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseBitwiseXOR() {
        var left = this.parseBitwiseAND();
        while(this.eatIf(Token.Type.CARET)) {
            this.parseBitwiseAND();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseBitwiseAND() {
        var left = this.parseEquality();
        while(this.eatIf(Token.Type.AMPERSAND)) {
            this.parseEquality();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseEquality() {
        var left = this.parseRelational();
        while(this.eatIfAny(
            Token.Type.EQUAL_EQUAL,
            Token.Type.NOT_EQUAL,
            Token.Type.EQUAL_EQUAL_EQUAL,
            Token.Type.NOT_EQUAL_EQUAL
        )){
            this.parseRelational();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseRelational() {
        var left = this.parseShiftExpression();
        while(this.eatIfAny(
            Token.Type.OPEN_ANGLE,
            Token.Type.CLOSE_ANGLE,
            Token.Type.GREATER_EQUAL,
            Token.Type.LESS_EQUAL,
            Token.Type.INSTANCEOF
        )){
            this.parseShiftExpression();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseShiftExpression() {
        var left = this.parseAdditiveExpression();
        while(this.eatIfAny(
            Token.Type.LEFT_SHIFT,
            Token.Type.RIGHT_SHIFT,
            Token.Type.UNSIGNED_RIGHT_SHIFT
        )) {
            this.parseAdditiveExpression();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseAdditiveExpression() {
        var left = this.parseMultiplicativeExpression();
        while (this.eatIfAny(
            Token.Type.PLUS,
            Token.Type.MINUS
        )) {
            this.parseMultiplicativeExpression();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseMultiplicativeExpression() {
        var left = this.parseExponentiationExpression();
        while (this.eatIfAny(
            Token.Type.SLASH,
            Token.Type.STAR,
            Token.Type.PERCENT
        )) {
            this.parseExponentiationExpression();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseExponentiationExpression() {
        var left = this.parseUnaryExpression();
        while (this.is(Token.Type.STAR_STAR)) {
            this.parseExponentiationExpression();
            left = left.collapse(Ast.BinaryExpression);
        }
        return left;
    }
    parseUnaryExpression(){
        if(this.isIn(
            Token.Type.AWAIT,
            Token.Type.DELETE,
            Token.Type.VOID,
            Token.Type.TYPEOF,
            Token.Type.PLUS_PLUS,
            Token.Type.MINUS_MINUS,
            Token.Type.PLUS,
            Token.Type.MINUS,
            Token.Type.TILDE,
            Token.Type.BANG
        )){
            var marker  = this.mark(Ast.UnaryExpression);
            this.eat(this.token.type);
            this.parseUnaryExpression();
            return marker.done(Ast.UnaryExpression);
        }else{
            return this.parsePostfixExpression();
        }

    }
    parsePostfixExpression(){
        var operand = this.parseLeftExpression();
        while (this.eatIfAny(
            Token.Type.PLUS_PLUS,
            Token.Type.MINUS_MINUS
        )) {
            operand = operand.collapse(Ast.PostfixExpression);
        }
        return operand;
    }
    parsePrimaryExpression() {
        var expression;
        switch (this.token.type) {
            case Token.Type.TEMPLATE        :
            case Token.Type.TEMPLATE_HEAD   : expression = this.parseTemplateExpression();      break;
            case Token.Type.SLASH           : // parse as regexp
            case Token.Type.SLASH_EQUAL     : expression = this.parseRegexpExpression();        break;
            case Token.Type.TRUE            :
            case Token.Type.FALSE           : expression = this.parseBooleanExpression();       break;
            case Token.Type.NUMBER          : expression = this.parseNumberExpression();        break;
            case Token.Type.STRING          : expression = this.parseStringExpression();        break;
            case Token.Type.NULL            : expression = this.parseNullExpression();          break;
            case Token.Type.NAN             : expression = this.parseNanExpression();           break;
            case Token.Type.UNDEFINED       : expression = this.parseUndefinedExpression();     break;
            case Token.Type.THIS            : expression = this.parseThisExpression();          break;
            case Token.Type.IDENTIFIER      : expression = this.parseIdentifier();              break;
            case Token.Type.CLASS           : expression = this.parseClassExpression();         break;
            case Token.Type.FUNCTION        : expression = this.parseFunctionExpression();      break;
            case Token.Type.OPEN_SQUARE     : expression = this.parseArrayExpression();         break;
            case Token.Type.OPEN_CURLY      : expression = this.parseObjectExpression();        break;
            case Token.Type.OPEN_PAREN      : expression = this.parseParenExpression();         break;
            case Token.Type.END_OF_FILE     : return this.error(`unexpected end of file`);
            default                         : return this.error(`unexpected token ${this.token.type}`);
        }
        return expression;
    }
    parseNumberExpression(){
        var marker = this.mark(Ast.NumberExpression);
        this.eat(Token.Type.NUMBER);
        return marker.done(Ast.NumberExpression);
    }
    parseStringExpression(){
        var marker = this.mark(Ast.StringExpression);
        this.eat(Token.Type.STRING);
        return marker.done(Ast.StringExpression);
    }
    parseBooleanExpression(){
        var marker = this.mark(Ast.BooleanExpression);
        this.eatAny(Token.Type.TRUE,Token.Type.FALSE);
        return marker.done(Ast.BooleanExpression);
    }
    parseNullExpression(){
        var marker = this.mark(Ast.NullExpression);
        this.eat(Token.Type.NULL);
        return marker.done(Ast.NullExpression);
    }
    parseNanExpression(){
        var marker = this.mark(Ast.NanExpression);
        this.eat(Token.Type.NAN);
        return marker.done(Ast.NanExpression);
    }
    parseUndefinedExpression(){
        var marker = this.mark(Ast.UndefinedExpression);
        this.eat(Token.Type.UNDEFINED);
        return marker.done(Ast.UndefinedExpression);
    }
    parseThisExpression(){
        var marker= this.mark(Ast.ThisExpression);
        this.eat(Token.Type.THIS);
        return marker.done(Ast.ThisExpression);
    }
    parseParenExpression(){
        var marker = this.mark(Ast.ParenExpression);
        this.eat(Token.Type.OPEN_PAREN);
        if(!this.is(Token.Type.CLOSE_PAREN)) {
            if (this.is(Token.Type.DOT_DOT_DOT)) {
                this.parseRestParameter();
            } else {
                this.parseAssignmentExpression();
                while (this.eatIf(Token.Type.COMMA)) {
                    this.parseAssignmentExpression();
                }
            }
        }
        this.eat(Token.Type.CLOSE_PAREN);
        return marker.done(Ast.ParenExpression)
    }
    parseLeftExpression(inNew=false){
        var marker;
        do{
            if(this.is(Token.Type.NEW)){
                marker  = this.parseNewExpression();
            }else
            if(!marker){
                marker  = this.parsePrimaryExpression();
            }else
            if(this.is(Token.Type.OPEN_PAREN) && !inNew){
                marker  = this.parseCallExpression();
            }else
            if(this.is(Token.Type.OPEN_SQUARE)){
                marker  = this.parseSquareMemberExpression();
            }else
            if(this.is(Token.Type.PERIOD)){
                marker  = this.parsePeriodMemberExpression();
            }else{
                break;
            }
        }while(true);
        return marker;
    }
    parseNewExpression(){
        var marker = this.mark(Ast.NewExpression);
        this.eat(Token.Type.NEW);
        this.parseLeftExpression(true);
        if (this.is(Token.Type.OPEN_PAREN)) {
            this.parseArguments();
        }
        return marker.done(Ast.NewExpression);
    }
    parseCallExpression(){
        var marker = this.mark(Ast.CallExpression);
        this.parseArguments();
        marker.done(Ast.CallExpression);
        marker.shift();
        return marker;
    }
    parseSquareMemberExpression(){
        var marker = this.mark(Ast.MemberExpression);
        this.eat(Token.Type.OPEN_SQUARE);
        this.parseAssignmentExpression();
        this.eat(Token.Type.CLOSE_SQUARE);
        marker.done(Ast.MemberExpression)
        marker.shift();

        return marker;
    }
    parsePeriodMemberExpression(){
        var marker = this.mark(Ast.MemberExpression);
        this.eat(Token.Type.PERIOD);
        this.parseIdentifier();
        marker.done(Ast.MemberExpression)
        marker.shift();
        return marker;
    }
    parseArguments() {
        var marker = this.mark(Ast.ArgumentList);
        this.eat(Token.Type.OPEN_PAREN);
        if (!this.is(Token.Type.CLOSE_PAREN)) {
            this.parseArgument();
            while (this.eatIf(Token.Type.COMMA)) {
                this.parseArgument();
            }
        }
        this.eat(Token.Type.CLOSE_PAREN);
        return marker.done(Ast.ArgumentList);
    }
    parseArgument() {
        if (this.is(Token.Type.DOT_DOT_DOT)){
            return this.parseSpreadExpression();
        }
        return this.parseAssignmentExpression();
    }
    parseArrayExpression(){
        var marker = this.mark(Ast.ArrayExpression);
        this.eat(Token.Type.OPEN_SQUARE);
        while(!this.is(Token.Type.CLOSE_SQUARE)){
            this.parseArrayElement();
            if(!this.eatIf(Token.Type.COMMA)){
                break;
            }
        }
        this.eat(Token.Type.CLOSE_SQUARE);
        return marker.done(Ast.ArrayExpression);
    }
    parseArrayElement(){
        var marker = this.mark(Ast.ArrayElement);
        if(!this.is(Token.Type.COMMA)){
            this.parseAssignmentExpression();
        }
        marker.done(Ast.ArrayElement);
        return marker;
    }
    parseObjectExpression(){
        var marker = this.mark(Ast.ObjectExpression);
        this.eat(Token.Type.OPEN_CURLY);
        while (this.is(Token.Type.IDENTIFIER)) {
            this.parseObjectProperty();
            if (!this.eatIf(Token.Type.COMMA)){
                break;
            }
        }
        this.eat(Token.Type.CLOSE_CURLY);
        return marker.done(Ast.ObjectExpression);
    }
    parseObjectProperty(){
        var marker = this.mark(Ast.ObjectProperty);
        this.eat(Token.Type.IDENTIFIER);
        if(this.eatIf(Token.Type.COLON)){
            this.parseAssignmentExpression();
        }
        marker.done(Ast.ObjectProperty);
        return marker;
    }
    parseArrowExpression(){
        var marker = this.mark(Ast.ArrowFunctionExpression);
        this.parseFormalSignature();
        this.eat(Token.Type.ARROW);
        this.parseBlockStatement();
        return marker.done(Ast.ArrowFunctionExpression);
    }
    parseFunctionExpression(){
        var marker = this.mark(Ast.FunctionExpression);
        this.eat(Token.Type.FUNCTION);
        if(this.is(Token.Type.IDENTIFIER)){
            this.parseIdentifier();
        }
        this.parseFormalSignature();
        this.parseBlockStatement();
        return marker.done(Ast.FunctionExpression);
    }
    parseTemplateExpression() {
        var marker = this.mark(Ast.TemplateLiteralExpression);
        if(this.is(Token.Type.TEMPLATE)){
            this.eat(Token.Type.TEMPLATE);
        }else
        if(this.eatIf(Token.Type.TEMPLATE_HEAD)){
            do{
                this.parseExpression();
                if(this.is(Token.Type.TEMPLATE_MIDDLE)){

                    this.eat(Token.Type.TEMPLATE_MIDDLE);
                }else
                if(!this.is(Token.Type.TEMPLATE_TAIL)){
                    this.eat(Token.Type.TEMPLATE_TAIL);
                }
            }while(!this.eatIf(Token.Type.TEMPLATE_TAIL));
        }
        return marker.done(Ast.TemplateLiteralExpression);
    }
    parseRegexpExpression() {
        var marker = this.mark(Ast.RegexpExpression);
        this.eat(Token.Type.REGEXP);
        return marker.done(Ast.RegexpExpression);
    }
    //</editor-fold>
    //<editor-fold desc="Annotations">
    parseTypeAnnotation(){
        var marker = this.mark(Ast.TypeReference);
        this.parseIdentifier();
        return marker.done(Ast.TypeReference);
    }
    parseAnnotations(){
        if(this.is(Token.Type.AT)) {
            var marker = this.mark(Ast.Annotations);
            while (this.is(Token.Type.AT)) {
                this.parseAnnotation();
            }
            return marker.done(Ast.Annotations);
        }else{
            return false;
        }
    }
    parseAnnotation(){
        var marker = this.mark(Ast.Annotation);
        this.eat(Token.Type.AT);
        this.parseIdentifier();
        if(this.is(Token.Type.OPEN_PAREN)){
            this.parseArguments();
        }
        return marker.done(Ast.Annotation);
    }
    //</editor-fold>
}
