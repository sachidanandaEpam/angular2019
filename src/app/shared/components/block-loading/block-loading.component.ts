import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-loading',
  templateUrl: './block-loading.component.html',
  styleUrls: ['./block-loading.component.scss']
})
export class BlockLoadingComponent implements OnInit {
  @Input() public size: 'small' | 'normal' | 'big' | 'huge' = 'normal';

  constructor() {}

  public ngOnInit() { }
}
