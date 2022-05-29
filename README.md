# My-calculator - kind calculator

My-calculator - is a small calculator, that can operate on simple math functions with any number of parenthesized expressions.

It can also operate on expressions like "100 + 10%", in this case it will find value of (10%) according to the number, to the left from operator (+), which will be (100) in our case;

If the user passes to input expression like "10(100+5)" calculator will automaticly use "\*" to get expression of type "10\*(100+5)".
In order to change this behaviour you need to highlight the operator and change it to another.
Trying deliting operator "\*" will have no effect because it leads to expression 10(100+5), that handler will not allow.

Operations proceeding in next order:

1. ()
2. %
3. - and /
4. - and +

Operations of type "100+10%+10%" proceeding like (100 + 10%) + 10%.

Technologies used: HTML, CSS, JS + RegExp
