import AndExpr from './andExpr';
import OrExpr from './orExpr';
import DefaultExpr from './defaultExpr';

class LogicFactory{

    createType(type,triples){

        if(type=='and'){
            return new AndExpr(triples);
        }

        if(type=='or'){
            return new OrExpr(triples);
        }

        return new DefaultExpr(triples);
    }

}

export default LogicFactory;