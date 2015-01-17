import {Node} from './Node'
export class Ast {
    static get Annotation                   (){return AnnotationNode              ;}
    static get Annotations                  (){return AnnotationsNode             ;}
    static get Argument                     (){return ArgumentNode                ;}
    static get Arguments                    (){return ArgumentsNode               ;}
    static get ArrayLiteral                 (){return ArrayNode            ;}
    static get ArrayElement                 (){return ArrayElementNode            ;}
    static get ArrowExpression              (){return ArrowNode         ;}
    static get BinaryExpression             (){return BinaryNode        ;}
    static get BlockStatement               (){return BlockNode          ;}
    static get BreakStatement               (){return BreakNode          ;}
    static get BooleanExpression            (){return BooleanNode                 ;}
    static get CallExpression               (){return CallNode          ;}
    static get CaseClause                   (){return SwitchCaseNode              ;}
    static get Catch                        (){return TryCatchNode                   ;}
    static get ClassBody                    (){return ClassBodyNode               ;}
    static get ClassDeclaration             (){return ClassDeclarationNode        ;}
    static get ClassField                   (){return ClassFieldNode              ;}
    static get ClassGetter                  (){return ClassGetterNode             ;}
    static get ClassMethod                  (){return ClassMethodNode             ;}
    static get ClassSetter                  (){return ClassSetterNode             ;}
    static get ConditionalExpression        (){return ConditionalNode   ;}
    static get ContinueStatement            (){return ContinueNode       ;}
    static get DebuggerStatement            (){return DebuggerNode       ;}
    static get DefaultImport                (){return DefaultImportNode           ;}
    static get DefaultClause                (){return DefaultClauseNode           ;}
    static get DoWhileStatement             (){return DoNode        ;}
    static get EmptyStatement               (){return EmptyNode          ;}
    static get ExportDeclaration            (){return ExportDeclarationNode       ;}
    static get ExportSpecifier              (){return ExportSpecifierNode         ;}
    static get ExpressionStatement          (){return ExpressionNode     ;}
    static get Finally                      (){return TryFinallyNode                 ;}
    static get ForSignature                 (){return ForSignatureNode            ;}
    static get ForStatement                 (){return ForNode            ;}
    static get FormalParameter              (){return FormalParameterNode         ;}
    static get FormalSignature              (){return FormalSignatureNode         ;}
    static get FunctionDeclaration          (){return FunctionDeclarationNode     ;}
    static get FunctionExpression           (){return ClosureNode      ;}
    static get Identifier                   (){return IdentifierNode              ;}
    static get IfStatement                  (){return IfNode             ;}
    static get Initializer                  (){return InitializerNode             ;}
    static get ImportDeclaration            (){return ImportDeclarationNode       ;}
    static get ImportSpecifier              (){return ImportSpecifierNode         ;}
    static get MemberExpression             (){return MemberNode        ;}
    static get Modifier                     (){return ModifierNode                ;}
    static get Modifiers                    (){return ModifiersNode               ;}
    static get Module                       (){return ModuleNode                  ;}
    static get ModuleSpecifier              (){return ModuleSpecifierNode         ;}
    static get NanExpression                (){return NanNode           ;}
    static get NamespaceImport              (){return NamespaceImportNode         ;}
    static get NamespaceExport              (){return NamespaceExportNode         ;}
    static get NewExpression                (){return NewNode           ;}
    static get NullExpression               (){return NullNode          ;}
    static get NumberExpression             (){return NumberNode        ;}
    static get ObjectExpression             (){return ObjectNode        ;}
    static get ObjectProperty               (){return ObjectElementNode          ;}
    static get ParenExpression              (){return ParenNode         ;}
    static get PostfixExpression            (){return PostfixNode       ;}
    static get RegexpExpression             (){return RegexpNode        ;}
    static get ReturnStatement              (){return ReturnNode         ;}
    static get SequenceExpression           (){return SequenceNode      ;}
    static get StringExpression             (){return StringNode        ;}
    static get SuperExpression              (){return SuperNode         ;}
    static get SwitchStatement              (){return SwitchNode         ;}
    static get TemplateExpression           (){return TemplateNode      ;}
    static get ThisExpression               (){return ThisNode          ;}
    static get ThrowStatement               (){return ThrowNode          ;}
    static get TryStatement                 (){return TryNode            ;}
    static get TypeReference                (){return TypeReferenceNode           ;}
    static get UnaryExpression              (){return UnaryNode         ;}
    static get UndefinedExpression          (){return UndefinedNode     ;}
    static get VariableDeclaration          (){return VariableDeclarationNode     ;}
    static get VariableDeclarator           (){return VariableDeclaratorNode      ;}
    static get WhileStatement               (){return WhileNode          ;}
    static get WithStatement                (){return WithNode           ;}
}

class AnnotationNode                        extends Node {}
class AnnotationsNode                       extends Node {}

class ClassBodyNode                         extends Node {}
class ClassDeclarationNode                  extends Node {}
class ClassFieldNode                        extends Node {}
class ClassGetterNode                       extends Node {}
class ClassMethodNode                       extends Node {}
class ClassSetterNode                       extends Node {}

class DefaultImportNode                     extends Node {}
class DefaultClauseNode                     extends Node {}
class ExportDeclarationNode                 extends Node {}
class ExportSpecifierNode                   extends Node {}
class FormalParameterNode                   extends Node {}
class FormalSignatureNode                   extends Node {}
class FunctionDeclarationNode               extends Node {}

class InitializerNode                       extends Node {}
class ImportDeclarationNode                 extends Node {}
class ImportSpecifierNode                   extends Node {}

class ModifierNode                          extends Node {}
class ModifiersNode                         extends Node {}
class ModuleNode                            extends Node {}
class ModuleSpecifierNode                   extends Node {}
class NamespaceImportNode                   extends Node {}
class NamespaceExportNode                   extends Node {}

class TypeReferenceNode                     extends Node {}

class VariableDeclarationNode               extends Node {}
class VariableDeclaratorNode                extends Node {}



// Statements
class Statement                             extends Node {}
class EmptyNode                             extends Statement {}
class BreakNode                             extends Statement {}
class ContinueNode                          extends Statement {}
class DebuggerNode                          extends Statement {}
class ThrowNode                             extends Statement {}
class ReturnNode                            extends Statement {}
class WhileNode                             extends Statement {}
class DoNode                                extends Statement {}
class WithNode                              extends Statement {}
class SwitchNode                            extends Statement {}
class SwitchCaseNode                        extends Node {}
class SwitchDefaultNode                     extends Node {}
class TryNode                               extends Statement {}
class TryCatchNode                          extends Node {}
class TryFinallyNode                        extends Node {}
class IfNode                                extends Statement {}
class ForNode                               extends Statement {}
class ForSignatureNode                      extends Node {}
class ExpressionNode                        extends Statement {}
class BlockNode                             extends Statement {}

// Expressions
class Expression                            extends Node {}
class ArrayNode                             extends Expression {}
class ArrayElementNode                      extends Node {}
class ObjectNode                            extends Expression {}
class ObjectElementNode                     extends Node {}
class TemplateNode                          extends Expression {}

class MemberNode                            extends Expression {}

class CallNode                              extends Expression {}
class NewNode                               extends CallNode {}
class ArgumentNode                          extends Node {}
class ArgumentsNode                         extends Node {}

class ArrowNode                             extends Expression {}
class BinaryNode                            extends Expression {}
class ConditionalNode                       extends Expression {}
class ParenNode                             extends Expression {}
class PostfixNode                           extends Expression {}
class SequenceNode                          extends Expression {}
class UnaryNode                             extends Expression {}
class ClosureNode                           extends Expression {}

// References
class Reference                             extends Expression {} // Expression
class IdentifierNode                        extends Reference {
    get attributes(){
        return {value:this.first.text}
    }
}
class SuperNode                             extends Reference {}
class ThisNode                              extends Reference {}
// Literals
class Literal                               extends Expression {
    get attributes(){
        return {value:this.first.text}
    }
} // Expression
class BooleanNode                           extends Literal {}
class NanNode                               extends Literal {}
class NullNode                              extends Literal {}
class NumberNode                            extends Literal {}
class RegexpNode                            extends Literal {}
class StringNode                            extends Literal {}
class UndefinedNode                         extends Literal {}