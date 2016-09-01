using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Last_Try
{
    public abstract class Aggregate // this is the Aggregate class
    {
        public List<Team> elements;

        public abstract Iterator createIterator();
    }
}
