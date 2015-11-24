using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Automation;
using System.Windows.Forms;

namespace SimpleAutoCorrect
{
    class Program
    {
        static void Main(string[] args)
        {
            var notepadWindow = AutomationElement.RootElement.FindFirst(
                TreeScope.Children,
                new PropertyCondition(AutomationElementIdentifiers.NameProperty, "Untitled - Notepad")
            );

            var document = notepadWindow.FindFirst(
                TreeScope.Children,
                new PropertyCondition(AutomationElementIdentifiers.ControlTypeProperty, ControlType.Document)
            );

            Automation.AddAutomationEventHandler(
                TextPattern.TextSelectionChangedEvent,
                document,
                TreeScope.Element,
                AutoCorrect
            );

            Console.ReadLine();
        }

        private static readonly Dictionary<string, string> REPLACEMENTS = new Dictionary<string, string>{
            {"teh", "the"},
            {"dont", "don't"},
            {"thing with dates", "calendar"},
            {"ahve", "have"}
        };

        private static void AutoCorrect(object sender, AutomationEventArgs e)
        {
            var element = (AutomationElement) sender;

            string originalText = element.GetText();
            string newText = originalText;

            if (newText.EndsWith(".")) {
                foreach (var replacement in REPLACEMENTS)
                {
                    if (newText.Contains(replacement.Key))
                    {
                        newText = newText.Replace(replacement.Key, replacement.Value);
                    }
                }
            }

            if (newText != originalText)
            {
                element.SetFocus();
                SendKeys.SendWait("^{HOME}");
                SendKeys.SendWait("^+{END}");
                SendKeys.SendWait("{DEL}");
                SendKeys.SendWait(newText);
            }
        }
    }
}
