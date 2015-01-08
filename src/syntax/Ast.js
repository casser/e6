import {AstNode} from './AstNode'

export class Ast {
    static get Annotation                   (){return Annotation                   ;}
    static get Annotations                  (){return Annotations                  ;}
    static get ArgumentList                 (){return ArgumentList                 ;}
    static get ArrayComprehension           (){return ArrayComprehension           ;}
    static get ArrayExpression              (){return ArrayExpression              ;}
    static get ArrayElement                 (){return ArrayElement                 ;}
    static get ArrayPattern                 (){return ArrayPattern                 ;}
    static get ArrayType                    (){return ArrayType                    ;}
    static get ArrowFunctionExpression      (){return ArrowFunctionExpression      ;}
    static get AssignmentElement            (){return AssignmentElement            ;}
    static get AwaitExpression              (){return AwaitExpression              ;}
    static get BinaryExpression             (){return BinaryExpression             ;}
    static get BindingElement               (){return BindingElement               ;}
    static get BlockStatement               (){return BlockStatement               ;}
    static get BreakStatement               (){return BreakStatement               ;}
    static get BooleanExpression            (){return BooleanExpression            ;}
    static get CallExpression               (){return CallExpression               ;}
    static get CallSignature                (){return CallSignature                ;}
    static get CaseClause                   (){return CaseClause                   ;}
    static get Catch                        (){return Catch                        ;}
    static get ClassBody                    (){return ClassBody                    ;}
    static get ClassDeclaration             (){return ClassDeclaration             ;}
    static get ClassExpression              (){return ClassExpression              ;}
    static get ClassField                   (){return ClassField                   ;}
    static get ClassGetter                  (){return ClassGetter                  ;}
    static get ClassMethod                  (){return ClassMethod                  ;}
    static get ClassSetter                  (){return ClassSetter                  ;}
    static get CommaExpression              (){return CommaExpression              ;}
    static get ComprehensionFor             (){return ComprehensionFor             ;}
    static get ComprehensionIf              (){return ComprehensionIf              ;}
    static get ComputedPropertyName         (){return ComputedPropertyName         ;}
    static get ConditionalExpression        (){return ConditionalExpression        ;}
    static get ConstructSignature           (){return ConstructSignature           ;}
    static get ConstructorType              (){return ConstructorType              ;}
    static get ContinueStatement            (){return ContinueStatement            ;}
    static get CoverFormals                 (){return CoverFormals                 ;}
    static get CoverInitializedName         (){return CoverInitializedName         ;}
    static get DebuggerStatement            (){return DebuggerStatement            ;}
    static get DefaultImport                (){return DefaultImport                ;}
    static get DefaultClause                (){return DefaultClause                ;}
    static get DoWhileStatement             (){return DoWhileStatement             ;}
    static get EmptyStatement               (){return EmptyStatement               ;}
    static get ExportDeclaration            (){return ExportDeclaration            ;}
    static get ExportDefault                (){return ExportDefault                ;}
    static get ExportSpecifier              (){return ExportSpecifier              ;}
    static get ExportSpecifierSet           (){return ExportSpecifierSet           ;}
    static get ExportStar                   (){return ExportStar                   ;}
    static get ExpressionStatement          (){return ExpressionStatement          ;}
    static get Finally                      (){return Finally                      ;}
    static get ForInStatement               (){return ForInStatement               ;}
    static get ForOfStatement               (){return ForOfStatement               ;}
    static get ForStatement                 (){return ForStatement                 ;}
    static get FormalParameter              (){return FormalParameter              ;}
    static get FormalSignature              (){return FormalSignature              ;}
    static get FunctionBody                 (){return FunctionBody                 ;}
    static get FunctionDeclaration          (){return FunctionDeclaration          ;}
    static get FunctionExpression           (){return FunctionExpression           ;}
    static get FunctionType                 (){return FunctionType                 ;}
    static get GeneratorComprehension       (){return GeneratorComprehension       ;}
    static get GetAccessor                  (){return GetAccessor                  ;}
    static get Identifier                   (){return Identifier                   ;}
    static get IdentifierExpression         (){return IdentifierExpression         ;}
    static get IfStatement                  (){return IfStatement                  ;}
    static get ImportDeclaration            (){return ImportDeclaration            ;}
    static get ImportSpecifier              (){return ImportSpecifier              ;}
    static get ImportSpecifierSet           (){return ImportSpecifierSet           ;}
    static get ImportedBinding              (){return ImportedBinding              ;}
    static get IndexSignature               (){return IndexSignature               ;}
    static get InterfaceDeclaration         (){return InterfaceDeclaration         ;}
    static get LabelledStatement            (){return LabelledStatement            ;}
    static get LiteralExpression            (){return LiteralExpression            ;}
    static get LiteralPropertyName          (){return LiteralPropertyName          ;}
    static get MemberExpression             (){return MemberExpression             ;}
    static get LookupExpression             (){return LookupExpression             ;}
    static get Modifier                     (){return Modifier                     ;}
    static get Modifiers                    (){return Modifiers                    ;}
    static get Module                       (){return Module                       ;}
    static get ModuleDeclaration            (){return ModuleDeclaration            ;}
    static get ModuleSpecifier              (){return ModuleSpecifier              ;}
    static get NamedExports                 (){return NamedExports                 ;}
    static get NamedImports                 (){return NamedImports                 ;}
    static get NanExpression                (){return NanExpression                ;}
    static get NamespaceImport              (){return NamespaceImport              ;}
    static get NamespaceExport              (){return NamespaceExport              ;}
    static get NewExpression                (){return NewExpression                ;}
    static get NullExpression               (){return NullExpression               ;}
    static get NumberExpression             (){return NumberExpression             ;}
    static get ObjectExpression             (){return ObjectExpression             ;}
    static get ObjectProperty               (){return ObjectProperty               ;}
    static get ObjectPattern                (){return ObjectPattern                ;}
    static get ObjectPatternField           (){return ObjectPatternField           ;}
    static get ObjectType                   (){return ObjectType                   ;}
    static get ParenExpression              (){return ParenExpression              ;}
    static get PostfixExpression            (){return PostfixExpression            ;}
    static get PredefinedType               (){return PredefinedType               ;}
    static get PropertyMethodAssignment     (){return PropertyMethodAssignment     ;}
    static get PropertyNameAssignment       (){return PropertyNameAssignment       ;}
    static get PropertyNameShorthand        (){return PropertyNameShorthand        ;}
    static get PropertySignature            (){return PropertySignature            ;}
    static get PropertyVariableDeclaration  (){return PropertyVariableDeclaration  ;}
    static get RegexpExpression             (){return RegexpExpression             ;}
    static get RestParameter                (){return RestParameter                ;}
    static get ReturnStatement              (){return ReturnStatement              ;}
    static get Script                       (){return Script                       ;}
    static get SetAccessor                  (){return SetAccessor                  ;}
    static get SequenceExpression           (){return SequenceExpression           ;}
    static get SpreadExpression             (){return SpreadExpression             ;}
    static get SpreadPatternElement         (){return SpreadPatternElement         ;}
    static get StringExpression             (){return StringExpression             ;}
    static get SuperExpression              (){return SuperExpression              ;}
    static get SwitchStatement              (){return SwitchStatement              ;}
    static get SyntaxErrorTree              (){return SyntaxErrorTree              ;}
    static get TemplateLiteralExpression    (){return TemplateLiteralExpression    ;}
    static get TemplateLiteralPortion       (){return TemplateLiteralPortion       ;}
    static get TemplateSubstitution         (){return TemplateSubstitution         ;}
    static get ThisExpression               (){return ThisExpression               ;}
    static get ThrowStatement               (){return ThrowStatement               ;}
    static get TryStatement                 (){return TryStatement                 ;}
    static get TypeArguments                (){return TypeArguments                ;}
    static get TypeName                     (){return TypeName                     ;}
    static get TypeParameter                (){return TypeParameter                ;}
    static get TypeParameters               (){return TypeParameters               ;}
    static get TypeReference                (){return TypeReference                ;}
    static get UnaryExpression              (){return UnaryExpression              ;}
    static get UndefinedExpression          (){return UndefinedExpression          ;}
    static get UnionType                    (){return UnionType                    ;}
    static get VariableDeclaration          (){return VariableDeclaration          ;}
    static get VariableDeclarator           (){return VariableDeclarator           ;}
    static get VariableStatement            (){return VariableStatement            ;}
    static get WhileStatement               (){return WhileStatement               ;}
    static get WithStatement                (){return WithStatement                ;}
    static get YieldExpressio               (){return YieldExpressio               ;}
}

class Annotation                     extends AstNode {}
class Annotations                    extends AstNode {}
class ArgumentList                   extends AstNode {}
class ArrayComprehension             extends AstNode {}
class ArrayExpression                extends AstNode {}
class ArrayElement                   extends AstNode {}
class ArrayPattern                   extends AstNode {}
class ArrayType                      extends AstNode {}
class ArrowFunctionExpression        extends AstNode {}
class AssignmentElement              extends AstNode {}
class AwaitExpression                extends AstNode {}
class BinaryExpression               extends AstNode {}
class BindingElement                 extends AstNode {}
class BlockStatement                 extends AstNode {}
class BreakStatement                 extends AstNode {}
class BooleanExpression              extends AstNode {}
class CallExpression                 extends AstNode {}
class CallSignature                  extends AstNode {}
class CaseClause                     extends AstNode {}
class Catch                          extends AstNode {}
class ClassBody                      extends AstNode {}
class ClassDeclaration               extends AstNode {}
class ClassExpression                extends AstNode {}
class ClassField                     extends AstNode {}
class ClassGetter                    extends AstNode {}
class ClassMethod                    extends AstNode {}
class ClassSetter                    extends AstNode {}
class CommaExpression                extends AstNode {}
class ComprehensionFor               extends AstNode {}
class ComprehensionIf                extends AstNode {}
class ComputedPropertyName           extends AstNode {}
class ConditionalExpression          extends AstNode {}
class ConstructSignature             extends AstNode {}
class ConstructorType                extends AstNode {}
class ContinueStatement              extends AstNode {}
class CoverFormals                   extends AstNode {}
class CoverInitializedName           extends AstNode {}
class DebuggerStatement              extends AstNode {}
class DefaultImport                  extends AstNode {}
class DefaultClause                  extends AstNode {}
class DoWhileStatement               extends AstNode {}
class EmptyStatement                 extends AstNode {}
class ExportDeclaration              extends AstNode {}
class ExportDefault                  extends AstNode {}
class ExportSpecifier                extends AstNode {}
class ExportSpecifierSet             extends AstNode {}
class ExportStar                     extends AstNode {}
class ExpressionStatement            extends AstNode {}
class Finally                        extends AstNode {}
class ForInStatement                 extends AstNode {}
class ForOfStatement                 extends AstNode {}
class ForStatement                   extends AstNode {}
class FormalParameter                extends AstNode {}
class FormalSignature                extends AstNode {}
class FunctionBody                   extends AstNode {}
class FunctionDeclaration            extends AstNode {}
class FunctionExpression             extends AstNode {}
class FunctionType                   extends AstNode {}
class GeneratorComprehension         extends AstNode {}
class GetAccessor                    extends AstNode {}
class Identifier                     extends AstNode {}
class IdentifierExpression           extends AstNode {}
class IfStatement                    extends AstNode {}
class ImportDeclaration              extends AstNode {}
class ImportSpecifier                extends AstNode {}
class ImportSpecifierSet             extends AstNode {}
class ImportedBinding                extends AstNode {}
class IndexSignature                 extends AstNode {}
class InterfaceDeclaration           extends AstNode {}
class LabelledStatement              extends AstNode {}
class LiteralExpression              extends AstNode {}
class LiteralPropertyName            extends AstNode {}
class LookupExpression               extends AstNode {}
class MemberExpression               extends AstNode {}
class Modifier                       extends AstNode {}
class Modifiers                      extends AstNode {}
class Module                         extends AstNode {}
class ModuleDeclaration              extends AstNode {}
class ModuleSpecifier                extends AstNode {}
class NamedExports                   extends AstNode {}
class NamedImports                   extends AstNode {}
class NanExpression                  extends AstNode {}
class NamespaceImport                extends AstNode {}
class NamespaceExport                extends AstNode {}
class NewExpression                  extends AstNode {}
class NullExpression                 extends AstNode {}
class NumberExpression               extends AstNode {}
class ObjectExpression               extends AstNode {}
class ObjectProperty                 extends AstNode {}
class ObjectPattern                  extends AstNode {}
class ObjectPatternField             extends AstNode {}
class ObjectType                     extends AstNode {}
class ParenExpression                extends AstNode {}
class PostfixExpression              extends AstNode {}
class PredefinedType                 extends AstNode {}
class PropertyMethodAssignment       extends AstNode {}
class PropertyNameAssignment         extends AstNode {}
class PropertyNameShorthand          extends AstNode {}
class PropertySignature              extends AstNode {}
class PropertyVariableDeclaration    extends AstNode {}
class RegexpExpression               extends AstNode {}
class RestParameter                  extends AstNode {}
class ReturnStatement                extends AstNode {}
class Script                         extends AstNode {}
class SetAccessor                    extends AstNode {}
class SequenceExpression             extends AstNode {}
class SpreadExpression               extends AstNode {}
class SpreadPatternElement           extends AstNode {}
class StringExpression               extends AstNode {}
class SuperExpression                extends AstNode {}
class SwitchStatement                extends AstNode {}
class SyntaxErrorTree                extends AstNode {}
class TemplateLiteralExpression      extends AstNode {}
class TemplateLiteralPortion         extends AstNode {}
class TemplateSubstitution           extends AstNode {}
class ThisExpression                 extends AstNode {}
class ThrowStatement                 extends AstNode {}
class TryStatement                   extends AstNode {}
class TypeArguments                  extends AstNode {}
class TypeName                       extends AstNode {}
class TypeParameter                  extends AstNode {}
class TypeParameters                 extends AstNode {}
class TypeReference                  extends AstNode {}
class UnaryExpression                extends AstNode {}
class UndefinedExpression            extends AstNode {}
class UnionType                      extends AstNode {}
class VariableDeclaration            extends AstNode {}
class VariableDeclarator             extends AstNode {}
class VariableStatement              extends AstNode {}
class WhileStatement                 extends AstNode {}
class WithStatement                  extends AstNode {}
class YieldExpressio                 extends AstNode {}