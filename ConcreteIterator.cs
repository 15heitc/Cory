using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Last_Try
{
    public class ConcreteIterator : Iterator
    {

        Aggregate aggregate;
        int CurrIndex = 0;

        public ConcreteIterator(Aggregate agg)
        {
            aggregate = agg;
        }


        public override Team First()
        {
            CurrIndex = 5;
            return CurrentItem();
        }

        public override Team Next()
        {
            CurrIndex--;
            return CurrentItem();
        }

        public override bool IsDone()
        {
            if (CurrIndex < 0) { return true; }
            else return false;
        }

        public override Team CurrentItem()
        {
            if (IsDone())
                return null;
            return aggregate.elements[CurrIndex];
        }
    }
}
