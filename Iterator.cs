using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Last_Try
{
    public abstract class Iterator
    {
        public abstract Team First();
        public abstract Team Next();
        public abstract bool IsDone();
        public abstract Team CurrentItem();
    }
}
