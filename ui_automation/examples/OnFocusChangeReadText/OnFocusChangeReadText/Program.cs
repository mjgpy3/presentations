using System;
using System.Windows.Automation;

namespace OnFocusChangeReadText
{
    class Program
    {
        private static AutomationElement _lastElement;

        static void Main(string[] args)
        {
            Automation.AddAutomationFocusChangedEventHandler(
                ListenToEditElement
            );

            Console.ReadLine();

            Automation.RemoveAllEventHandlers();
        }

        private static void ListenToEditElement(object sender, AutomationFocusChangedEventArgs e)
        {
            var element = (AutomationElement) sender;

            if (element.Current.ControlType == ControlType.Edit && DiffersFromLastElement(element))
            {
                if (HandlerExists())
                {
                    RemoveHandler();
                }

                Automation.AddAutomationPropertyChangedEventHandler(
                    element,
                    TreeScope.Element,
                    LogElementText,
                    AutomationElementIdentifiers.NameProperty,
                    ValuePattern.ValueProperty
                );

                _lastElement = element;
            }
        }

        private static void LogElementText(object sender, AutomationEventArgs e)
        {
            var element = (AutomationElement) sender;

            Console.WriteLine(element.GetText());
        }

        private static bool DiffersFromLastElement(AutomationElement element)
        {
            return _lastElement != element;
        }

        private static bool HandlerExists()
        {
            return _lastElement != null;
        } 

        private static bool NewElement(AutomationElement element)
        {
            return _lastElement != element;
        }

        private static void RemoveHandler()
        {
            Automation.RemoveAutomationPropertyChangedEventHandler(_lastElement, LogElementText);
        }
    }
}
