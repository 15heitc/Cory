using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Last_Try
{
    public class ConcreteAggregate : Aggregate // this is the ConcreteAggregate class
    {
        public List<Team> elements = new List<Team>();
        public ConcreteAggregate()
        {
        }

        public override Iterator createIterator()
        {
            return new ConcreteIterator(this);
        }
    }

}
