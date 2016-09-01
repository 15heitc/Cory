using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;



namespace Last_Try
{
    public partial class Form1 : Form
    {
        ConcreteAggregate agg;
        Iterator iterator;
        Team Bengals;
        Team Browns;
        Team Broncos;
        Team Jaguars;
        Team Panthers;
        Team Vikings;
        public Form1()
        {
            InitializeComponent();
            EstablishIteratorPattern();
        }
        public void EstablishIteratorPattern()
        {
            agg = new ConcreteAggregate();
            Bengals = new Team("Bengals", 12, true, false);
            Browns = new Team("Browns", 3, true, false);
            Broncos = new Team("Broncos", 12, true, true);
            Jaguars = new Team("Jaguars", 5, true, false);
            Panthers = new Team("Panthers", 15, true, false);
            Vikings = new Team("Vikings", 11, true, false);

            agg.elements.Add(Bengals);
            agg.elements.Add(Browns);
            agg.elements.Add(Broncos);
            agg.elements.Add(Jaguars);
            agg.elements.Add(Panthers);
            agg.elements.Add(Vikings);
            iterator = agg.createIterator();
        }
        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            listBox1.Items.Add("Hi");
            for (iterator.First(); !iterator.IsDone(); iterator.Next())
            {
                listBox1.Items.Add(iterator.CurrentItem().getName());
            }
        }







    }
}



