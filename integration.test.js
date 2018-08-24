import test from 'ava'
import { spawn } from 'child_process'
import waitPort from 'wait-port'
import { openChrome, closeBrowser, openTab, findElement, clickElement } from 'puppet-strings'

test('starting a web server and shows a counter that defaults to 0 and allows incrementing by 1', async t => {
   const server = spawn('yarn', ['start']);

   await waitPort({ port: 8080, timeout: 5000 });

   const chrome = await openChrome();
   const tab = await openTab(chrome, 'http://localhost:8080');

   const initialCounter = await findElement(tab, '.counter');
   t.is(initialCounter.innerText, '0');

   const incrementButton = await findElement(tab, '.increment');
   await clickElement(incrementButton);

    const updatedCounter = await findElement(tab, '.counter');
    t.is(updatedCounter.innerText, '1');

    const decrementButton = await findElement(tab, '.decrement');
    await clickElement(decrementButton);

    const updatedAgainCounter = await findElement(tab, '.counter');
    t.is(updatedAgainCounter.innerText, '0');

   await closeBrowser(chrome);
   server.kill();
});