using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Last_Try
{
    public class Team
    {
        string name;
        int wins;
        bool playoffs;
        bool noSuperBowl;

        public Team(string Name, int Wins, bool Playoffs, bool SuperBowl)
        {
            Name = name;
            Wins = wins;
            Playoffs = playoffs;
            SuperBowl = noSuperBowl;
        }
        public string getName()
        {
            return name;
        }
        public string getWins()
        {
            return name;
        }
        public bool getPlayoffs()
        {
            return playoffs;
        }
        public bool getSuperBowl()
        {
            return noSuperBowl;
        }

    }
}
