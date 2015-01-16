import {Node} from './Node'
export class Ast {
    static get Annotation                   (){return AnnotationNode              ;}
    static get Annotations                  (){return AnnotationsNode             ;}
    static get Argument                     (){return ArgumentNode                ;}
    static get Arguments                    (){return ArgumentsNode               ;}
    static get ArrayLiteral                 (){return ArrayLiteralNode            ;}
    static get ArrayElement                 (){return ArrayElementNode            ;}
    static get ArrowExpression              (){return ArrowExpressionNode         ;}
    static get BinaryExpression             (){return BinaryExpressionNode        ;}
    static get BlockStatement               (){return BlockStatementNode          ;}
    static get BreakStatement               (){return BreakStatementNode          ;}
    static get BooleanExpression            (){return BooleanExpressionNode       ;}
    static get CallExpression               (){return CallExpressionNode          ;}
    static get CaseClause                   (){return CaseClauseNode              ;}
    static get Catch                        (){return CatchNode                   ;}
    static get ClassBody                    (){return ClassBodyNode               ;}
    static get ClassDeclaration             (){return ClassDeclarationNode        ;}
    static get ClassField                   (){return ClassFieldNode              ;}
    static get ClassGetter                  (){return ClassGetterNode             ;}
    static get ClassMethod                  (){return ClassMethodNode             ;}
    static get ClassSetter                  (){return ClassSetterNode             ;}
    static get ConditionalExpression        (){return ConditionalExpressionNode   ;}
    static get ContinueStatement            (){return ContinueStatementNode       ;}
    static get DebuggerStatement            (){return DebuggerStatementNode       ;}
    static get DefaultImport                (){return DefaultImportNode           ;}
    static get DefaultClause                (){return DefaultClauseNode           ;}
    static get DoWhileStatement             (){return DoWhileStatementNode        ;}
    static get EmptyStatement               (){return EmptyStatementNode          ;}
    static get ExportDeclaration            (){return ExportDeclarationNode       ;}
    static get ExportSpecifier              (){return ExportSpecifierNode         ;}
    static get ExpressionStatement          (){return ExpressionStatementNode     ;}
    static get Finally                      (){return FinallyNode                 ;}
    static get ForSignature                 (){return ForSignatureNode            ;}
    static get ForStatement                 (){return ForStatementNode            ;}
    static get FormalParameter              (){return FormalParameterNode         ;}
    static get FormalSignature              (){return FormalSignatureNode         ;}
    static get FunctionDeclaration          (){return FunctionDeclarationNode     ;}
    static get FunctionExpression           (){return FunctionExpressionNode      ;}
    static get Identifier                   (){return IdentifierNode              ;}
    static get IfStatement                  (){return IfStatementNode             ;}
    static get Initializer                  (){return InitializerNode             ;}
    static get ImportDeclaration            (){return ImportDeclarationNode       ;}
    static get ImportSpecifier              (){return ImportSpecifierNode         ;}
    static get MemberExpression             (){return MemberExpressionNode        ;}
    static get Modifier                     (){return ModifierNode                ;}
    static get Modifiers                    (){return ModifiersNode               ;}
    static get Module                       (){return ModuleNode                  ;}
    static get ModuleSpecifier              (){return ModuleSpecifierNode         ;}
    static get NanExpression                (){return NanExpressionNode           ;}
    static get NamespaceImport              (){return NamespaceImportNode         ;}
    static get NamespaceExport              (){return NamespaceExportNode         ;}
    static get NewExpression                (){return NewExpressionNode           ;}
    static get NullExpression               (){return NullExpressionNode          ;}
    static get NumberExpression             (){return NumberExpressionNode        ;}
    static get ObjectExpression             (){return ObjectExpressionNode        ;}
    static get ObjectProperty               (){return ObjectPropertyNode          ;}
    static get ParenExpression              (){return ParenExpressionNode         ;}
    static get PostfixExpression            (){return PostfixExpressionNode       ;}
    static get RegexpExpression             (){return RegexpExpressionNode        ;}
    static get ReturnStatement              (){return ReturnStatementNode         ;}
    static get SequenceExpression           (){return SequenceExpressionNode      ;}
    static get StringExpression             (){return StringExpressionNode        ;}
    static get SuperExpression              (){return SuperExpressionNode         ;}
    static get SwitchStatement              (){return SwitchStatementNode         ;}
    static get TemplateExpression           (){return TemplateExpressionNode      ;}
    static get ThisExpression               (){return ThisExpressionNode          ;}
    static get ThrowStatement               (){return ThrowStatementNode          ;}
    static get TryStatement                 (){return TryStatementNode            ;}
    static get TypeReference                (){return TypeReferenceNode           ;}
    static get UnaryExpression              (){return UnaryExpressionNode         ;}
    static get UndefinedExpression          (){return UndefinedExpressionNode     ;}
    static get VariableDeclaration          (){return VariableDeclarationNode     ;}
    static get VariableDeclarator           (){return VariableDeclaratorNode      ;}
    static get WhileStatement               (){return WhileStatementNode          ;}
    static get WithStatement                (){return WithStatementNode           ;}
}

class AnnotationNode                        extends Node {}
class AnnotationsNode                       extends Node {}
class ArgumentNode                          extends Node {}
class ArgumentsNode                         extends Node {}
class ArrayLiteralNode                      extends Node {}
class ArrayElementNode                      extends Node {}
class ArrowExpressionNode                   extends Node {}
class BinaryExpressionNode                  extends Node {}
class BlockStatementNode                    extends Node {}
class BreakStatementNode                    extends Node {}
class BooleanExpressionNode                 extends Node {}
class CallExpressionNode                    extends Node {}
class CaseClauseNode                        extends Node {}
class CatchNode                             extends Node {}
class ClassBodyNode                         extends Node {}
class ClassDeclarationNode                  extends Node {}
class ClassFieldNode                        extends Node {}
class ClassGetterNode                       extends Node {}
class ClassMethodNode                       extends Node {}
class ClassSetterNode                       extends Node {}
class ConditionalExpressionNode             extends Node {}
class ContinueStatementNode                 extends Node {}
class DebuggerStatementNode                 extends Node {}
class DefaultImportNode                     extends Node {}
class DefaultClauseNode                     extends Node {}
class DoWhileStatementNode                  extends Node {}
class EmptyStatementNode                    extends Node {}
class ExportDeclarationNode                 extends Node {}
class ExportSpecifierNode                   extends Node {}
class ExpressionStatementNode               extends Node {}
class FinallyNode                           extends Node {}
class ForSignatureNode                      extends Node {}
class ForStatementNode                      extends Node {}
class FormalParameterNode                   extends Node {}
class FormalSignatureNode                   extends Node {}
class FunctionDeclarationNode               extends Node {}
class FunctionExpressionNode                extends Node {}
class IdentifierNode                        extends Node {}
class IfStatementNode                       extends Node {}
class InitializerNode                       extends Node {}
class ImportDeclarationNode                 extends Node {}
class ImportSpecifierNode                   extends Node {}
class MemberExpressionNode                  extends Node {}
class ModifierNode                          extends Node {}
class ModifiersNode                         extends Node {}
class ModuleNode                            extends Node {}
class ModuleSpecifierNode                   extends Node {}
class NanExpressionNode                     extends Node {}
class NamespaceImportNode                   extends Node {}
class NamespaceExportNode                   extends Node {}
class NewExpressionNode                     extends Node {}
class NullExpressionNode                    extends Node {}
class NumberExpressionNode                  extends Node {}
class ObjectExpressionNode                  extends Node {}
class ObjectPropertyNode                    extends Node {}
class ParenExpressionNode                   extends Node {}
class PostfixExpressionNode                 extends Node {}
class RegexpExpressionNode                  extends Node {}
class ReturnStatementNode                   extends Node {}
class SequenceExpressionNode                extends Node {}
class StringExpressionNode                  extends Node {}
class SuperExpressionNode                   extends Node {}
class SwitchStatementNode                   extends Node {}
class TemplateExpressionNode                extends Node {}
class ThisExpressionNode                    extends Node {}
class ThrowStatementNode                    extends Node {}
class TryStatementNode                      extends Node {}
class TypeReferenceNode                     extends Node {}
class UnaryExpressionNode                   extends Node {}
class UndefinedExpressionNode               extends Node {}
class VariableDeclarationNode               extends Node {}
class VariableDeclaratorNode                extends Node {}
class WhileStatementNode                    extends Node {}
class WithStatementNode                     extends Node {}
