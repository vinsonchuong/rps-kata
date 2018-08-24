import * as React from 'react';
import test from 'ava'
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils'
import Counter from './counter';
import { JSDOM } from 'jsdom'
import { promisify } from 'util'

const sleep = promisify(setTimeout);

test('rendering a 0 count by default', async t => {
    const container = mount(<Counter />);

    await sleep(500);

    t.is(container.querySelector('.counter').textContent, '0')
});

test('incrementing the count by 1', async t => {
    const container = mount(<Counter />);
    await sleep(500);

    Simulate.click(container.querySelector('.increment'));
    t.is(container.querySelector('.counter').textContent, '1')
});

test('decrementing the count by 1', async t => {
    const container = mount(<Counter />);
    await sleep(500);

    Simulate.click(container.querySelector('.decrement'));
    t.is(container.querySelector('.counter').textContent, '-1')
});

function mount(jsx) {
    const { window } = new JSDOM('<!doctype html>');
    const container = window.document.createElement('div');

    render(jsx, container);

    return container
}
